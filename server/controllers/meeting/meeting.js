const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');


const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).json({ success: true, data: meeting });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find({ deleted: false }).populate('attendes attendesLead createBy');
        res.status(200).json({ success: true, data: meetings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findById(req.params.id).populate('attendes attendesLead createBy');
        if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
        res.status(200).json({ success: true, data: meeting });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
        res.status(200).json({ success: true, message: 'Meeting deleted successfully', data: meeting });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;
        await MeetingHistory.updateMany({ _id: { $in: ids } }, { deleted: true });
        res.status(200).json({ success: true, message: 'Meetings deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { add, index, view, deleteData, deleteMany };
