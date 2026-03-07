import { useMapDetailQueryOption } from '@api/map/query';
import RegisterForm from '@domain/map/RegisterForm';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const MapEditPage = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data } = useSuspenseQuery(useMapDetailQueryOption(id));

  console.info('@@@', { data });
  if (!id || !data) {
    router.push('/map');
    return;
  }

  return (
    <div>
      <RegisterForm edit={{ isEdit: true, defaultValues: data, soptMapId: id }} />
    </div>
  );
};

export default MapEditPage;
