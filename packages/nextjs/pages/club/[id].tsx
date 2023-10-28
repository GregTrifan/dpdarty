import { useRouter } from "next/router";

const ClubPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Club Page</h1>
      <p>Club ID: {id}</p>
    </div>
  );
};

export default ClubPage;
