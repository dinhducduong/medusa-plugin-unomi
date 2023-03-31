import { TransactionBaseService, Product } from "@medusajs/medusa"
import axios from 'axios';
import crypto from "crypto"
import { BaseService } from "medusa-interfaces"
class UnomiService extends BaseService {
  constructor(
    {
      unomiClientService,
      manager,
      shippingProfileService,
      storeService,
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
    /** @private @const {ShippingProfileService} */
    this.shippingProfileService_ = shippingProfileService
    /** @private @const {StoreService} */
    this.store_ = storeService
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
    // const countData = await this.productService_.getProducts()
    const data = await axios.get(process.env.URL_BACKEND_MEDUSA + `${'store/products'}`)
    return data
  }

  async createProfileUmoni() {
    return this.atomicPhase_(async (manager) => {
      const products = await this.getProductMedusa()
      await Promise.all(
        products.data.products.map(async (product) => {
          const data = {
            "itemId": product.id,
            "itemType": "product",
            "properties": product,
            "systemProperties": {
              "mergeIdentifier": "bill",
              "lists": [
                "userListId"
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