import {connect} from "unomi-node-sdk";
export const createClient = (options) => {
  const { url,username, password,elasticUrl } = options
  const unomisdk = connect({
    url: url,
    auth: {
      username: username,
      password: password
    },
    elasticUrl: elasticUrl
  });

  return unomisdk
}
