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
} from "../controller/userController.mjs";

const router = Router();

router.get("/api/users", allData);
router.get("/api/users/:id", dataFromParams);
router.post("/api/addData", checkSchema(userVadationSchema), addData);
router
  .route("/api/updateData/:id")
  .put(validateUserData, completeDataUpdate)
  .patch(validateUserData, partialDataUpdate)
  .delete(validateUserData, deleteData);

export default router;
