import Member from '../Models/member.js';
import Membership from'../Models/membership.js';



function getNextDate(months, joiningDate) {
    // Parse the joining date into a Date object
    const date = new Date(joiningDate);


    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid joining date provided.");
    }

    // Add the specified number of months
    date.setMonth(date.getMonth() + months);

    // Format the date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');


    return `${year}-${month}-${day}`;
}


export const registermember = async (req, res) => {
    try {
        const { name, phone, emergency_phone, email, membership, joiningdate, age, gender, batch, image_url, address, payment } = req.body;
        const member = await Member.findOne({ gym_id: req.gym._id, phone });
        if (member) {
            return res.status(201).json({ message: "Member already exists" });
        }
        const memberShip = await Membership.findOne({ _id: membership, gym_id: req.gym._id });
        const membershipmonth = memberShip.month;
        if (memberShip) {           
            const nextPaymentDate = getNextDate(membershipmonth, joiningdate);
            const newMember = new Member({
                name,
                phone,
                emergency_phone,
                email,
                membership,
                age,
                payment,
                gender,
                batch,
                image_url,
                address,
                gym_id: req.gym._id,
                joiningdate,
                nextPaymentDate
            });
            await newMember.save();
            res.status(200).json({ message: "Member added successfully" ,newMember});
        }
    } catch (error) {
        res.status(400)
            .json({ error:"Failed To Add" });
    }
};

export const getmembers = async (req, res) => {
    try {
        const members = await Member.find({ gym_id: req.gym._id }).populate({
            path: 'membership', // Field to populate
            select: 'month price', // Fields to include in the populated data
        }).sort({ joiningdate: -1 });
        res.status(200).json({ members ,count:members.length,message:"Members fetched successfully"});
    } catch (error) {
        res.status(400)
            .json({ error: error.message });
    }
}


export const deletemember = async (req, res) => {
    try {
        const member = await Member.findOneAndDelete({ _id: req.params.id });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {     
        res.status(400)
            .json({ error: error.message });
    }
}

export const getmemberbyid = async (req, res) => {
    const { id } = req.params;

  try {
    // Find the member by ID
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ member });
  } catch (error) {
    res.status(500).json({ message: "Server error. Unable to fetch member." });
  }
};


export const updatemember = async (req, res) => {
    const { id } = req.params;
  const { name, age, email, phone, image_url } = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { name, age, email, phone, image_url },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found." });
    }

    res.status(200).json({ message: "Member updated successfully.", member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: "Error updating member.", error: error.message });
  }
};


export const renewmembership = async (req, res) => {
    const { id } = req.params;
  const { membership, renewDate } = req.body;

  const nextPaymentDate = getNextDate(membership.month, renewDate);

  try {
    // Find the member by ID
    const member = await Member.findByIdAndUpdate(
      id,
      { membership, nextPaymentDate ,joiningdate:renewDate},
      { new: true }
    );
    res.status(200).json({ message: "Membership renewed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error renewing membership." });
  }
}
