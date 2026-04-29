import { useParams } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import ExplorerPanel from '@/components/ExplorerPanel';
import DocPanel from '@/components/DocPanel';
import './explorer.scss';

export default function ExplorerPage() {
  const { product: productId, endpoint: endpointId } = useParams<{ product: string; endpoint: string }>();
  const product = getProductById(productId!);

  if (!product) {
    return <div className="explorer__not-found">产品未找到</div>;
  }

  let endpoint = null;
  for (const group of product.groups) {
    endpoint = group.endpoints.find((ep) => ep.id === endpointId);
    if (endpoint) break;
  }

  if (!endpoint) {
    return <div className="explorer__not-found">API 未找到</div>;
  }

  return (
    <div className="explorer">
      <ApiSidebar currentProductId={product.id} currentEndpointId={endpointId} />
      <ExplorerPanel endpoint={endpoint} productId={product.id} />
      <DocPanel endpoint={endpoint} />
    </div>
  );
}
