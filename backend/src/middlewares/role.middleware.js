export const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin allowed" });
    }
    next();
  };