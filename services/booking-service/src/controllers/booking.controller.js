module.exports = (bookingRepo) => ({
    // // get all
    // async getAllCinemas(req, res) {
    //   try {
    //     const cinemas = await cinemaRepo.getAllCinemas();
    //     res.status(200).json({ payload: cinemas });
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
    // },
  
    // // create
    // async createCinema(req, res) {
    //   try {
    //     const { cinema_name, address, phone_number, district, city } = req.body;
    //     const currentDateTime = new Date();
    //     const newCinema = await cinemaRepo.addNewCinema({
    //       cinema_name,
    //       address,
    //       phone_number,
    //       district,
    //       city,
    //       create_date: currentDateTime,
    //       update_date: null,
    //       delete_date: null,
    //     });
    //     res.status(200).json({ payload: newCinema });
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
    // },
  
    // // update
    // async updateCinema(req, res) {
    //   try {
    //     const _id = req.params._id;
    //     const { cinema_name, address, phone_number, district, city } = req.body;
    //     const currentDateTime = new Date();
    //     await cinemaRepo.updateCinema(_id, {
    //       cinema_name,
    //       address,
    //       phone_number,
    //       district,
    //       city,
    //       update_date: currentDateTime,
    //     });
    //     res.status(200).json({});
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
    // },
  
    // // delete
    // async deleteCinema(req, res) {
    //   try {
    //     const _id = req.params._id;
    //     const currentDateTime = new Date();
    //     await cinemaRepo.deleteCinema(_id, {
    //       delete_date: currentDateTime,
    //     });
    //     res.status(200).json({});
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
    // },
  });
  