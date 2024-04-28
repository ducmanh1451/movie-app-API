module.exports = (helperRepo) => ({
  // get all
  async getLibraryByCode(req, res) {
    try {
      const library = await helperRepo.getLibraryByCode(req.params.lib_cd);
      res.status(200).json({ payload: library });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
