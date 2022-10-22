import { Request, Response, NextFunction } from 'express';
import AdminService from '@/services/admin';

class AdminController {
  async getAnalitics(req: Request, res: Response, next: NextFunction) {
    try {
      const analiticsData = await AdminService.getAnaliticsData();

      return res.json([...analiticsData]);
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
