const Attendance = require("../models/attendance.model");

// 1. [EMPLOYÉ] Voir SA PROPRE présence d'aujourd'hui (Corrigé pour Angular !)
const getMyAttendanceToday = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      employeeId: req.user._id,
      date: { $gte: startOfToday, $lte: endOfToday }
    });
    
    // CORRECTION CRITIQUE : On encapsule dans un tableau [] pour satisfaire le *ngFor et le .length d'Angular
    return res.status(200).json({ 
      success: true, 
      data: attendance ? [attendance] : [] 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [EMPLOYÉ] Pointer à l'arrivée (Check-In)
const checkIn = async (req, res) => {
  try {
    const { notes } = req.body;
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const alreadyCheckedIn = await Attendance.findOne({ 
      employeeId: req.user._id, 
      date: { $gte: startOfToday, $lte: endOfToday } 
    });
    
    if (alreadyCheckedIn) {
      return res.status(400).json({ success: false, message: "Vous avez déjà pointé votre arrivée aujourd'hui." });
    }

    const now = new Date();
    let status = "PRESENT";
    
    if (now.getHours() >= 9 && now.getMinutes() > 0) {
      status = "LATE";
    }

    const newAttendance = new Attendance({
      employeeId: req.user._id,
      date: startOfToday,
      checkIn: now,
      status,
      notes
    });

    await newAttendance.save();
    return res.status(201).json({ success: true, message: "Arrivée enregistrée !", data: newAttendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. [EMPLOYÉ] Pointer au départ (Check-Out)
const checkOut = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({ 
      employeeId: req.user._id, 
      date: { $gte: startOfToday, $lte: endOfToday } 
    });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Aucun enregistrement d'arrivée trouvé." });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ success: false, message: "Départ déjà enregistré." });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    return res.status(200).json({ success: true, message: "Départ enregistré !", data: attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. [ADMIN] Voir TOUTES les présences globales
const getAllAttendances = async (req, res) => {
  try {
    const list = await Attendance.find()
      .populate("employeeId", "firstName lastName email")
      .sort({ date: -1 });
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. [ADMIN] Créer un pointage manuel
const createAttendanceAdmin = async (req, res) => {
  try {
    const { employeeId, date, checkIn, checkOut, status, notes } = req.body;
    
    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);
    const endOfDate = new Date(date);
    endOfDate.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({ 
      employeeId: employeeId, 
      date: { $gte: startOfDate, $lte: endOfDate } 
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Un pointage existe déjà pour cet employé à cette date." });
    }

    const newAttendance = new Attendance({
      employeeId,
      date: startOfDate,
      checkIn: new Date(checkIn),
      checkOut: checkOut ? new Date(checkOut) : null,
      status: status || "PRESENT",
      notes: notes || ""
    });

    await newAttendance.save();
    return res.status(201).json({ success: true, data: newAttendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 6. [ADMIN] Obtenir par ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate("employeeId", "firstName lastName email");
    return res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 7. [ADMIN] Modifier un pointage
const updateAttendance = async (req, res) => {
  try {
    const { date, status, checkIn, checkOut, notes } = req.body;
    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);

    const updateData = { status, notes, date: baseDate };

    if (status !== "ABSENT" && checkIn) {
      const [h, m] = checkIn.split(":");
      const cin = new Date(baseDate); cin.setHours(parseInt(h), parseInt(m));
      updateData.checkIn = cin;

      if (checkOut) {
        const [ch, cm] = checkOut.split(":");
        const cout = new Date(baseDate); cout.setHours(parseInt(ch), parseInt(cm));
        updateData.checkOut = cout;
      }
    }

    const updated = await Attendance.findByIdAndUpdate(req.params.id, updateData, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendanceToday,
  getAllAttendances,
  createAttendanceAdmin,
  getAttendanceById,
  updateAttendance
};