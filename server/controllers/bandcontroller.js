const { Band, Member } = require("../models");

class BandController {
  static async showAllBand(req, res, next) {
    try {
      const bands = await Band.findAll({
        attributes: ["id", "name", "maxmember"],
      });
      res.status(200).json(bands);
    } catch (err) {
      next(err);
    }
  }

  static async CreateBand(req, res, next) {
    try {
      const { name, maxmember } = req.body;
      const band = await Band.create({ name, maxmember });

      res.status(201).json({
        name: band.name,
        maxmember: band.maxmember,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addMember(req, res, next) {
    try {
      const { BandId, name, position } = req.body;
      const band = await Band.findByPk(BandId);

      if (!band) {
        throw { name: `BandNotFound` };
      }

      const memberCheck = await Member.findAll({ where: { BandId } });

      if (memberCheck.length >= band.maxmember) {
        throw { name: `MaxMember` };
      }

      const member = await Member.create({ name, position, BandId });

      res.status(201).json({ band_id: band.id, member_id: member.id });
    } catch (err) {
      next(err);
    }
  }

  static async findBandById(req, res, next) {
    try {
      const BandId = req.params.band_id;
      const band = await Band.findOne({
        where: { id : BandId },
        attributes: ["name","maxmember"],
        include: {
          model: Member,
          attributes: ["name", "position"],
        },
      });

      if (!band) {
        throw { name: `BandNotFound` };
      }
      res.status(200).json(band);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BandController;
