const optional = {
  API_HOST_URI: '',
};

const requiredKeys = [
  ...Object.keys(optional),
];

const env = Object.assign({}, optional, process.env);

const required = requiredKeys.reduce((required, requiredKey) =>
  Object.assign({ [requiredKey]: JSON.stringify(env[requiredKey]) }),
{});

module.exports = {
  required,
  requiredKeys,
};
