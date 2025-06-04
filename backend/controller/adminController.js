export const adminLogin = async (req, res) => {
  const { email /*, password*/ } = req.body;

  try {
    const admin = await User.findOne({ email, isAdmin: true });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

    // TEMPORARILY SKIP PASSWORD CHECK
    // const isPasswordValid = await bcrypt.compare(password, admin.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid admin credentials"
    //   });
    // }

    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email,
        isAdmin: true 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful (password check skipped)",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};