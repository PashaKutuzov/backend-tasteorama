export default function ctrlWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log('Catch error:', error);
      next(error);
    }
  };
}
