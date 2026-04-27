import { useEffect, useState, useCallback, useRef } from 'react';
import { useModel, useLocation, history } from '@umijs/max';
import './index.scss';

interface GuideStep {
  selector: string | null;
  iframeSelector?: string;
  text: string;
  preferPosition: 'right' | 'below' | 'above' | 'left' | 'center';
  waitForNavigation?: boolean;
  /** If true, highlight covers the whole visible page (light overlay, no spotlight) */
  fullPage?: boolean;
  /** Optional rich content rendered after text */
  extra?: React.ReactNode;
}

const LIST_STEPS: GuideStep[] = [
  {
    selector: null,
    fullPage: true,
    text: '左侧切换产品，右侧查看接口列表，点击任意一行进入详情页。现在请点击一个 API 继续。',
    preferPosition: 'center',
    waitForNavigation: true,
  },
];

const DETAIL_STEPS: GuideStep[] = [
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--7',
    text: '接口文档：左侧展示 API 的请求参数，包括参数名、数据类型和说明。下方还有响应格式（Response）的字段说明。',
    preferPosition: 'right',
  },
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--5',
    text: '调试面板：右侧用于在线调试。顶部显示请求方法和路径，中间填入令牌和参数，底部可选择不同语言查看代码示例。',
    preferPosition: 'left',
  },
  {
    selector: '.auth-guide',
    text: '获取令牌：在这里点击「复制」获取你的 Bearer Token。也可以点击链接前往控制台获取。',
    preferPosition: 'below',
  },
  {
    selector: '.endpoint-page__iframe',
    iframeSelector: '.col--5',
    text: '发起调试：将复制的 Token 粘贴到「Bearer Token」输入框，点击「Send API Request」即可发起调用，下方会实时显示返回结果。',
    preferPosition: 'left',
  },
  {
    selector: null,
    text: '正式接入请使用 AK/SK：Bearer Token 仅供在线调试，生产环境请前往控制台创建 AccessKey 进行签名认证。AK Secret 仅创建时显示，请妥善保存。',
    preferPosition: 'center',
    extra: (
      <a
        href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key"
        target="_blank"
        rel="noopener noreferrer"
        className="onboarding-tooltip__link-btn"
      >
        前往获取 AK/SK
      </a>
    ),
  },
  {
    selector: null,
    text: '了解完毕！如需再次查看可点击顶部「新手指引」。',
    preferPosition: 'center',
  },
];

const STORAGE_KEY = 'sensecore-guide-seen';

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

function bestTooltipPosition(
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

export default function OnboardingGuide() {
  const { guideOpen, setGuideOpen } = useModel('global');
  const location = useLocation();
  const [phase, setPhase] = useState<'list' | 'detail'>('list');
  const [stepIdx, setStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const steps = phase === 'list' ? LIST_STEPS : DETAIL_STEPS;
  const step = steps[stepIdx];
  const globalStepNum =
    phase === 'list' ? stepIdx + 1 : LIST_STEPS.length + stepIdx + 1;
  const totalSteps = LIST_STEPS.length + DETAIL_STEPS.length;

  // Init: redirect to list page when guide opens
  useEffect(() => {
    if (!guideOpen) {
      setReady(false);
      return;
    }
    const isDetail = location.pathname.match(/\/apis\/[^/]+\/[^/]+/);
    if (isDetail) {
      history.push('/apis/ecs');
      const timer = setTimeout(() => {
        setPhase('list');
        setStepIdx(0);
        setReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (!location.pathname.startsWith('/apis/')) {
      history.push('/apis/ecs');
      const timer = setTimeout(() => {
        setPhase('list');
        setStepIdx(0);
        setReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
    setReady(true);
  }, [guideOpen]);

  // Detect navigation from list to detail (Step 1 waitForNavigation)
  useEffect(() => {
    if (!guideOpen || !ready) return;
    if (phase === 'list' && step?.waitForNavigation) {
      if (location.pathname.match(/\/apis\/[^/]+\/[^/]+/)) {
        setTimeout(() => {
          setPhase('detail');
          setStepIdx(0);
        }, 600);
      }
    }
  }, [location.pathname, guideOpen, ready, phase, step]);

  // Measure target element rect
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
          height: Math.min(r.height, 300),
        });
      } catch {
        return clampRect({
          top: iRect.top,
          left: iRect.left,
          width: iRect.width,
          height: Math.min(iRect.height, 400),
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

  useEffect(() => {
    if (!guideOpen || !ready) return;
    const update = () => setTargetRect(getRect());
    const timer = setTimeout(update, 200);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [guideOpen, ready, phase, stepIdx, getRect]);

  const handleClose = useCallback(() => {
    setGuideOpen(false);
    setPhase('list');
    setStepIdx(0);
    setReady(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, [setGuideOpen]);

  const handleNext = useCallback(() => {
    if (step?.waitForNavigation) return;
    if (stepIdx < steps.length - 1) {
      setStepIdx((p) => p + 1);
    } else if (phase === 'list') {
      setPhase('detail');
      setStepIdx(0);
    } else {
      handleClose();
    }
  }, [stepIdx, steps.length, phase, step, handleClose]);

  if (!guideOpen || !ready) return null;

  const isLastStep = phase === 'detail' && stepIdx === DETAIL_STEPS.length - 1;
  const isFullPage = !!step?.fullPage;
  const isCentered = !step?.selector || !targetRect;
  const isWaiting = !!step?.waitForNavigation;

  const tooltipW = 380;
  const tooltipH = 160;
  const tooltipStyle: React.CSSProperties = isCentered
    ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    : bestTooltipPosition(targetRect!, step.preferPosition, tooltipW, tooltipH);

  const pad = 6;

  return (
    <div
      className={`onboarding-overlay${isWaiting ? ' onboarding-overlay--passthrough' : ''}${isFullPage ? ' onboarding-overlay--fullpage' : ''}`}
      onClick={isWaiting ? undefined : handleClose}
    >
      {targetRect && !isCentered && !isFullPage && (
        <div
          className="onboarding-spotlight"
          style={{
            top: targetRect.top - pad,
            left: targetRect.left - pad,
            width: targetRect.width + pad * 2,
            height: targetRect.height + pad * 2,
          }}
        />
      )}
      {(isCentered || isFullPage) && <div className="onboarding-overlay__dim" />}
      <div
        ref={tooltipRef}
        className="onboarding-tooltip"
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="onboarding-tooltip__step">
          {globalStepNum}/{totalSteps}
        </div>
        <div className="onboarding-tooltip__text">{step.text}</div>
        {step.extra && <div className="onboarding-tooltip__extra">{step.extra}</div>}
        <div className="onboarding-tooltip__actions">
          <button className="onboarding-tooltip__skip" onClick={handleClose}>
            跳过
          </button>
          {!isWaiting ? (
            <button className="onboarding-tooltip__next" onClick={handleNext}>
              {isLastStep ? '完成' : '下一步'}
            </button>
          ) : (
            <span className="onboarding-tooltip__waiting">请点击 API 接口 ↑</span>
          )}
        </div>
      </div>
    </div>
  );
}
