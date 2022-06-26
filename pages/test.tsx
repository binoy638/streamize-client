import React, { useEffect } from 'react';

import { useVideoQuery } from '../generated/apolloComponents';

const Test = () => {
  const { loading, error, data } = useVideoQuery({
    variables: { input: { videoSlug: '9vnjx', torrentSlug: '01rxp' } }
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  return <div>{!!data.video && data.video.name}</div>;
};

export default Test;
