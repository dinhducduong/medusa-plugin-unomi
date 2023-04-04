export default async (container, options) => {
    try {
      console.log("---------Starting import product Unomi")
      const unomiService = container.resolve("unomiService")
      await unomiService.createProfileUmoni()
    } catch (err) {
      // ignore
      console.log(err)
    }
  }