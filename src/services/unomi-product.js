import { BaseService } from "medusa-interfaces"

class UnomiProductService extends BaseService {
  constructor(
    {
      manager,
      productService,
    },
    options
  ) {
    super()

    this.options = options

    /** @private @const {EntityManager} */
    this.manager_ = manager
    /** @private @const {ProductService} */
    this.productService_ = productService
  }

  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }

    const cloned = new UnomiProductService({
      manager: transactionManager,
      options: this.options,
      productService: this.productService_,
    })

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  async getProducts() {
    return this.atomicPhase_(async (manager) => {
      const data = await this.productService_.list({},{ 
        take: this.options.take, 
        skip: this.options.skip,
        relations:[
          "variants",
          "variants.prices",
          "variants.options",
          "images",
          "options",
          "options.values",
          "tags",
          "type",
          "collection",
        ] })
      return data
    })
  }
}

export default UnomiProductService
