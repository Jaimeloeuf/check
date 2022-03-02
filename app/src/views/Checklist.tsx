import { useLocation, useParams } from "solid-app-router";

export default () => {
  const params = useParams();
  const location = useLocation();

  return (
    <div>
      <h1>test</h1>

      <h3>params.id = {params.id}</h3>
      <h3>location.query.view = {location.query.view}</h3>

      <pre>
        <div>{JSON.stringify(params)}</div>
      </pre>
      <pre>
        <div>{JSON.stringify(location)}</div>
      </pre>
    </div>
  );
};
