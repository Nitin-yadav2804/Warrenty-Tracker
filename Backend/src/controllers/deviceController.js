import mongoose from "mongoose";
import { Device } from "../models/device.js";
import { addWarrantyDetails } from "../utils/warrantyStatus.js";

export const createDevice = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
      notes,
    } = req.body ?? {};

    const device = await Device.create({
      name,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
      notes,
      userId: req.user._id, 
    });

    return res.status(201).json({
      success: true,
      device: addWarrantyDetails(device),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Check the required fields and device dates",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create device",
    });
  }
};

export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      userId: req.user._id, 
    });

    const now = new Date();

    return res.json({
      success: true,
      devices: devices.map((device) => addWarrantyDetails(device, now)),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch devices",
    });
  }
};

export const updateDevice = async (req, res) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid device ID" });
  }

  const allowedFields = [
    "name", "brand", "category", "purchaseDate", "warrantyEndDate", "notes",
  ];
  const updates = req.body;

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return res.status(400).json({ success: false, message: "Send device fields to update" });
  }

  const fields = Object.keys(updates);

  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field) || typeof updates[field] !== "string")
  ) {
    return res.status(400).json({
      success: false,
      message: "Only device details can be updated. Send text values and dates as YYYY-MM-DD.",
    });
  }

  try {

    const device = await Device.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!device) {
      return res.status(404).json({ success: false, message: "Device not found" });
    }

    for (const field of fields) {
      device[field] = updates[field];
    }


    await device.save();

    return res.json({ success: true, device: addWarrantyDetails(device) });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Check the required fields and device dates",
      });
    }

    return res.status(500).json({ success: false, message: "Unable to update device" });
  }
};

export const deleteDevice = async (req, res) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid device ID" });
  }

  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!device) {
      return res.status(404).json({ success: false, message: "Device not found" });
    }

    return res.json({ success: true, message: "Device deleted successfully" });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to delete device" });
  }
};
