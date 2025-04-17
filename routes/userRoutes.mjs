import { Router } from "express";
import { checkSchema } from "express-validator";
import { validateUserData } from "../middleware/validationMiddleWare.mjs";
import { userVadationSchema } from "../utils/validationSchema.mjs";
import {
  addData,
  completeDataUpdate,
  partialDataUpdate,
  deleteData,
  allData,
  dataFromParams,
  authenticateData,
  checkData,
  aunthtiCatedDetail,
} from "../controller/userController.mjs";
import { validateUser } from "../middleware/authenticationMiddleware.mjs";

const router = Router();

router.get("/api/users", allData);
router.get("/api/users/:id", dataFromParams);
router.post("/api/addData", checkSchema(userVadationSchema), addData);
router
  .route("/api/updateData/:id")
  .put(validateUserData, completeDataUpdate)
  .patch(validateUserData, partialDataUpdate)
  .delete(validateUserData, deleteData);

router.route("/api/auth/users").post(authenticateData).get(checkData);

router.get("/api/auth/jwt", validateUser, aunthtiCatedDetail);

export default router;
