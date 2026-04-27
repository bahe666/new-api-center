import { Link, useParams } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import AuthGuide from '@/components/AuthGuide';
import './endpoint.scss';

export default function EndpointPage() {
  const { product: productId, endpoint: endpointId } = useParams<{
    product: string;
    endpoint: string;
  }>();

  const product = getProductById(productId!);
  const endpoint = product?.groups
    .flatMap((g) => g.endpoints)
    .find((e) => e.id === endpointId);

  if (!product || !endpoint) {
    return (
      <div className="endpoint-page__not-found">
        <h2>API 未找到</h2>
        <p>找不到对应的 API 接口。</p>
        <Link to="/apis/ecs">返回 API 目录</Link>
      </div>
    );
  }

  return (
    <div className="endpoint-page">
      <ApiSidebar currentProductId={productId!} currentEndpointId={endpointId} />
      <div className="endpoint-page__main">
        <AuthGuide />
        <iframe
          className="endpoint-page__iframe"
          src={endpoint.detailUrl}
          title={endpoint.displayName}
        />
      </div>
    </div>
  );
}
