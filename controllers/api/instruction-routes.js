const router = require("express").Router();
const { Instructions } = require("../../models");
const withAuth = require("../../utils/authorize"); // Import the Auth middleware

router.get("/", (req, res) => {
  Instructions.findAll()
    .then((dbInstructionData) => res.json(dbInstructionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Instructions.create({
    instruction_text: req.body.instruction_text,
    user_id: req.session.user_id,
    pet_id: req.body.pet_id,
  })
    .then((dbInstructionData) => res.json(dbInstructionData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Instructions.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbInstructionData) => {
      if (!dbInstructionData) {
        res.status(404).json({ message: "no instructions with this id" });
        return;
      }
      res.json(dbInstructionData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Instructions.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json(err);
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
