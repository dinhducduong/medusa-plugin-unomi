import { BaseService } from "medusa-interfaces"
class UnomiService extends BaseService {
  constructor(
    {
      unomiClientService,
      manager,
      unomiProductService
    },
    options
  ) {
    super()
    this.options = options
    /** @private @const {EntityManager} */
    this.manager_ = manager
    /** @private @const {UnomiRestClient} */
    this.client_ = unomiClientService
    /** @private @const {UnomiProductService} */
    this.productService_ = unomiProductService
  }
  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }
    const cloned = new UnomiService({
      manager: transactionManager,
      options: this.options,
      shippingProfileService: this.shippingProfileService_,
      unomiClientService: this.client_,
      storeService: this.store_,
    })
    cloned.transactionManager_ = transactionManager
    return cloned
  }
  async getProductMedusa() {
    const products = this.productService_.getProducts()
    return products
  }
  async createProfileUmoni() {
    return this.atomicPhase_(async (manager) => {
      const products = await this.getProductMedusa()
      await Promise.all(
        products.map(async (product) => {
          const data = {
            "itemId": product.id,
            "itemType": "profile",
            "properties": product,
            "systemProperties": {
              "mergeIdentifier": "bill",
              "lists": [
                "productListId"
              ],
            }
          }
          return await this.client_.createProfile(data)
        })
      )
    })
  }
}

export default UnomiService