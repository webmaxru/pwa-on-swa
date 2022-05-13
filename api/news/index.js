module.exports = async function (context, req) {

  let clientPrincipal = {};

  try {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    clientPrincipal = JSON.parse(decoded);
  } catch (err) {
    context.log(`${err.name}: ${err.message}`);
  }

  context.res = {
    body: {
      data: 'Some data with NetworkFirst strategy',
      clientPrincipal: clientPrincipal,
    },
  };
};
