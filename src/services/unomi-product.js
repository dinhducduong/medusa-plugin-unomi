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
    let data = await this.productService_.count()
    return data
  }
}

export default UnomiProductService
