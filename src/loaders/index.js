export default async (container, options) => {
    try {
      console.log("Starting import product Unomi")
      const unomiService = container.resolve("unomiService")
      const data =  await unomiService.createProfileUmoni()
      console.log(data);
    } catch (err) {
      // ignore
      console.log(err)
    }
  }