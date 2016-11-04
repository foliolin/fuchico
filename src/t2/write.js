export default function write({ data, productId, xExositeCik }) {
  const body = Object.keys(data)
    .map(alias => `${alias}=${data[alias]}`)
    .join('&');

  return fetch(`https://${productId}.m2.exosite.com/onep:v1/stack/alias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'X-Exosite-CIK': xExositeCik,
    },
    body,
  });
};
