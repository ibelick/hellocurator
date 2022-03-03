import dynamic from "next/dynamic";
const DynamicComponent = dynamic(() => import("../components/ListItem"), {
  ssr: false,
});

const SdkPage = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default SdkPage;
