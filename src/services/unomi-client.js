import { BaseService } from "medusa-interfaces"
import { createClient } from "../utils/connect"

class UnomiClientService extends BaseService {
  // eslint-disable-next-line no-empty-pattern
  constructor({}, options) {
    super()
    this.options = { 
         url: "http://localhost:8181",
         username: "karaf",
         password: "karaf",
         elasticUrl: "http://localhost:9200" 
        }
    /** @private @const {UnomiRestClient} */
    this.client_ = createClient(this.options)
  }
  createProfile(params) {
    return this.client_.profile.create(params)
  }
}

export default UnomiClientService
