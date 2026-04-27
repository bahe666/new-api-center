import { useEffect, useState, useCallback, useRef } from 'react';
import { useModel, useLocation, history } from '@umijs/max';
import './index.scss';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type TriggerKind =
  | { type: 'navigation'; pattern: RegExp }
  | { type: 'event'; eventName: string }
  | { type: 'poll'; check: () => boolean; interval?: number; timeout?: number }
  | { type: 'manual' }; // advance via "下一步" button

interface GuideStep {
  /** CSS selector on the main page (null = centered card, no spotlight) */
  selector: string | null;
  /** If target lives inside the iframe, the selector within the iframe */
  iframeSelector?: string;
  /** Tooltip text */
  text: string;
  /** Preferred tooltip position relative to spotlight */
  preferPosition: 'right' | 'left' | 'below' | 'above' | 'center';
  /** How the step advances */
  trigger: TriggerKind;
  /** Optional rich JSX rendered after text */
  extra?: React.ReactNode;
  /** Button label override (default: "下一步" or "完成") */
  btnLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

const STEPS: GuideStep[] = [
  /* Step 1 — list page: highlight entire product page (sidebar + table) */
  {
    selector: '.product-page',
    text: '欢迎使用 SenseCore API 中心！左侧是产品导航，点击展开查看 API 列表；右侧是接口详情表格。请点击任意一行 API 进入详情页。',
    preferPosition: 'center',
    trigger: { type: 'navigation', pattern: /\/apis\/[^/]+\/[^/]+/ },
    btnLabel: '请点击 API 继续...',
  },
  /* Step 2 — detail page: left column intro */
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--7',
    text: '接口文档区：展示请求参数（参数名、类型、说明）及响应格式（Response）字段说明。',
    preferPosition: 'right',
    trigger: { type: 'manual' },
  },
  /* Step 3 — detail page: right column intro */
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--5',
    text: '调试面板：填入 Token 后可直接调用 API。底部提供多种语言的代码示例。',
    preferPosition: 'left',
    trigger: { type: 'manual' },
  },
  /* Step 4 — detail page: copy token */
  {
    selector: '.auth-guide__copy-btn',
    text: '点击「复制」获取 Bearer Token。',
    preferPosition: 'below',
    trigger: { type: 'event', eventName: 'auth-guide-token-copied' },
    btnLabel: '等待操作完成...',
  },
  /* Step 5 — detail page: paste token into iframe input */
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: 'input[placeholder*="Bearer"], input[placeholder*="Token"]',
    text: '将复制的 Token 粘贴到「Bearer Token」输入框中。',
    preferPosition: 'left',
    trigger: {
      type: 'poll',
      check: () => {
        try {
          const iframe = document.querySelector(
            '.endpoint-page__iframe',
          ) as HTMLIFrameElement | null;
          if (!iframe) return false;
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) return false;
          const input = doc.querySelector(
            'input[placeholder*="Bearer"], input[placeholder*="Token"]',
          ) as HTMLInputElement | null;
          return !!(input && input.value.trim());
        } catch {
          return false;
        }
      },
      interval: 500,
      timeout: 120_000,
    },
    btnLabel: '等待操作完成...',
  },
  /* Step 6 — detail page: click Send API Request */
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--5',
    text: '点击「Send API Request」发起调用。',
    preferPosition: 'left',
    trigger: {
      type: 'poll',
      check: () => {
        try {
          const iframe = document.querySelector(
            '.endpoint-page__iframe',
          ) as HTMLIFrameElement | null;
          if (!iframe) return false;
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) return false;
          return !!doc.querySelector('.mock-response');
        } catch {
          return false;
        }
      },
      interval: 500,
      timeout: 120_000,
    },
    btnLabel: '等待操作完成...',
  },
  /* Step 7 — detail page: response appeared */
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.mock-response',
    text: '调用结果已返回！右侧展示了 API 的响应数据。',
    preferPosition: 'left',
    trigger: { type: 'manual' },
  },
  /* Step 8 — centered card: AK/SK reminder */
  {
    selector: null,
    text: '正式接入请使用 AK/SK：Bearer Token 仅供在线调试，生产环境请前往控制台创建 AccessKey 进行签名认证。AK Secret 仅创建时显示，请妥善保存。',
    preferPosition: 'center',
    trigger: { type: 'manual' },
    extra: (
      <a
        href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key"
        target="_blank"
        rel="noopener noreferrer"
        className="onboarding-guide__link-btn"
      >
        前往获取 AK/SK
      </a>
    ),
  },
  /* Step 9 — highlight floating guide button: done */
  {
    selector: '.guide-fab',
    text: '了解完毕！后续可随时点击此按钮重新查看。',
    preferPosition: 'above',
    trigger: { type: 'manual' },
    btnLabel: '完成',
  },
];

const STORAGE_KEY = 'sensecore-guide-seen';

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function clampRect(r: Rect): Rect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    top: Math.max(0, Math.min(r.top, vh - 50)),
    left: Math.max(0, Math.min(r.left, vw - 50)),
    width: Math.min(r.width, vw),
    height: Math.min(r.height, vh - r.top),
  };
}

function tooltipPosition(
  target: Rect,
  prefer: string,
  tw: number,
  th: number,
): React.CSSProperties {
  const gap = 14;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = 12;

  const positions: Record<string, React.CSSProperties> = {
    right: { top: Math.max(pad, target.top), left: target.left + target.width + gap },
    left: { top: Math.max(pad, target.top), left: target.left - tw - gap },
    below: { top: target.top + target.height + gap, left: Math.max(pad, target.left) },
    above: { top: target.top - th - gap, left: Math.max(pad, target.left) },
  };

  const fits = (pos: React.CSSProperties): boolean => {
    const t = (pos.top as number) || 0;
    const l = (pos.left as number) || 0;
    return t >= 0 && t + th <= vh && l >= 0 && l + tw <= vw;
  };

  if (positions[prefer] && fits(positions[prefer])) return positions[prefer];
  for (const dir of ['below', 'right', 'left', 'above']) {
    if (positions[dir] && fits(positions[dir])) return positions[dir];
  }

  return {
    top: Math.max(pad, Math.min((positions[prefer]?.top as number) || pad, vh - th - pad)),
    left: Math.max(pad, Math.min((positions[prefer]?.left as number) || pad, vw - tw - pad)),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function OnboardingGuide() {
  const { guideOpen, setGuideOpen } = useModel('global');
  const location = useLocation();

  const [stepIdx, setStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIdx];
  const isInteractive = step?.trigger.type !== 'manual';
  const isCentered = !step?.selector;

  /* ---- Init: navigate to list page when guide opens ---- */
  useEffect(() => {
    if (!guideOpen) {
      setReady(false);
      return;
    }
    setStepIdx(0);

    if (!location.pathname.startsWith('/apis/') || location.pathname.match(/\/apis\/[^/]+\/[^/]+/)) {
      history.push('/apis/ecs');
      const timer = setTimeout(() => setReady(true), 600);
      return () => clearTimeout(timer);
    }

    setReady(true);
  }, [guideOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- Close helper ---- */
  const handleClose = useCallback(() => {
    setGuideOpen(false);
    setStepIdx(0);
    setReady(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, [setGuideOpen]);

  /* ---- Advance to next step ---- */
  const advance = useCallback(() => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      handleClose();
    }
  }, [stepIdx, handleClose]);

  /* ---- Trigger: navigation (Step 1) ---- */
  useEffect(() => {
    if (!guideOpen || !ready) return;
    if (step?.trigger.type !== 'navigation') return;
    const { pattern } = step.trigger;
    if (pattern.test(location.pathname)) {
      // Delay slightly so the detail page renders
      const t = setTimeout(advance, 600);
      return () => clearTimeout(t);
    }
  }, [location.pathname, guideOpen, ready, step, advance]);

  /* ---- Trigger: custom event (Step 2) ---- */
  useEffect(() => {
    if (!guideOpen || !ready) return;
    if (step?.trigger.type !== 'event') return;
    // Auto-expand auth guide card if collapsed
    localStorage.removeItem('sensecore-auth-guide-collapsed');
    const card = document.querySelector('.auth-guide');
    if (card && !card.querySelector('.auth-guide__body')) {
      const header = card.querySelector('.auth-guide__header') as HTMLElement;
      header?.click();
    }
    const { eventName } = step.trigger;
    const handler = () => {
      // Small delay so "已复制" is visible
      setTimeout(advance, 400);
    };
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [guideOpen, ready, step, advance]);

  /* ---- Trigger: polling (Steps 3 & 4) ---- */
  useEffect(() => {
    if (!guideOpen || !ready) return;
    if (step?.trigger.type !== 'poll') return;
    const { check, interval = 500, timeout = 60_000 } = step.trigger;
    const start = Date.now();
    const id = window.setInterval(() => {
      if (check()) {
        window.clearInterval(id);
        advance();
      } else if (Date.now() - start > timeout) {
        // Timeout: auto-advance so the user isn't stuck
        window.clearInterval(id);
        advance();
      }
    }, interval);
    return () => window.clearInterval(id);
  }, [guideOpen, ready, step, advance]);

  /* ---- Measure target element rect ---- */
  const getRect = useCallback((): Rect | null => {
    if (!step?.selector) return null;
    const el = document.querySelector(step.selector) as HTMLElement;
    if (!el) return null;

    if (step.iframeSelector) {
      const iframe = el as HTMLIFrameElement;
      const iRect = iframe.getBoundingClientRect();
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return null;
        const inner = doc.querySelector(step.iframeSelector);
        if (!inner) return null;
        const r = inner.getBoundingClientRect();
        return clampRect({
          top: iRect.top + r.top,
          left: iRect.left + r.left,
          width: r.width,
          height: r.height,
        });
      } catch {
        return clampRect({
          top: iRect.top,
          left: iRect.left,
          width: iRect.width,
          height: iRect.height,
        });
      }
    }

    const rect = el.getBoundingClientRect();
    return clampRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [step]);

  /* Keep rect up-to-date */
  useEffect(() => {
    if (!guideOpen || !ready) return;
    const update = () => setTargetRect(getRect());
    // Initial measurement with a small delay for DOM readiness
    const timer = setTimeout(update, 300);
    const raf = () => {
      update();
      rafId = requestAnimationFrame(raf);
    };
    // Use rAF for smooth tracking (scroll / resize)
    let rafId = requestAnimationFrame(raf);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [guideOpen, ready, stepIdx, getRect]);

  /* ---- Render ---- */
  if (!guideOpen || !ready) return null;

  const hasSpotlight = !!step?.selector && !!targetRect;
  const isLastStep = stepIdx === STEPS.length - 1;

  const tooltipW = 380;
  const tooltipH = 160;
  const tooltipStyle: React.CSSProperties = isCentered || !targetRect
    ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    : tooltipPosition(targetRect, step.preferPosition, tooltipW, tooltipH);

  const pad = 8;

  return (
    <div className="onboarding-guide" data-interactive={isInteractive || undefined}>
      {/* Spotlight element — uses box-shadow to create the dark overlay */}
      {hasSpotlight && (
        <div
          className="onboarding-guide__spotlight"
          style={{
            top: targetRect.top - pad,
            left: targetRect.left - pad,
            width: targetRect.width + pad * 2,
            height: targetRect.height + pad * 2,
          }}
        />
      )}

      {/* Full-screen dim for centered cards (no spotlight) */}
      {!hasSpotlight && <div className="onboarding-guide__dim" />}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="onboarding-guide__tooltip"
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="onboarding-guide__step-num">
          {stepIdx + 1}/{STEPS.length}
        </div>
        <div className="onboarding-guide__text">{step.text}</div>
        {step.extra && <div className="onboarding-guide__extra">{step.extra}</div>}
        <div className="onboarding-guide__actions">
          <button className="onboarding-guide__skip" onClick={handleClose}>
            跳过
          </button>
          {step.trigger.type === 'manual' ? (
            <button className="onboarding-guide__next" onClick={advance}>
              {step.btnLabel || (isLastStep ? '完成' : '下一步')}
            </button>
          ) : (
            <span className="onboarding-guide__waiting">
              {step.btnLabel || (step.trigger.type === 'navigation'
                ? '请点击 API 继续...'
                : '等待操作完成...')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
