const { getConnection } = require("../services/salesforceService");

const uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "No file selected"

            });

        }

        const conn = getConnection();

        const result = await conn.sobject("ContentVersion").create({

            Title: req.file.originalname,

            PathOnClient: req.file.originalname,

            VersionData: req.file.buffer.toString("base64")

        });

        res.json({

            success: true,

            message: "File Uploaded Successfully",

            fileId: result.id

        });

    } catch (err) {

        console.error(err);
        getIO().emit("dashboardUpdated");
        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {
    uploadFile
};