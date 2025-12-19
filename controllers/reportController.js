const Report = require('../models/Report');
const Recipe = require('../models/Recipe');
const Task = require('../models/Task');
const User = require('../models/User');
const Category = require('../models/Category');
const Bookmark = require('../models/Bookmark');
const MealPlan = require('../models/MealPlan');

const generateUserReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const recipes = await Recipe.find({ author: userId });
    const tasks = await Task.find({ user: userId });
    
    const reportData = {
      totalRecipes: recipes.length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.isCompleted).length,
      recipes: recipes,
      tasks: tasks
    };

    const report = new Report({
      type: 'user_activity',
      data: reportData,
      user: userId
    });

    await report.save();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ generatedAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    const totalRecipes = await Recipe.countDocuments();
    const approvedRecipes = await Recipe.countDocuments({ isApproved: true });
    const pendingRecipes = await Recipe.countDocuments({ isApproved: false });
    const featuredRecipes = await Recipe.countDocuments({ isFeatured: true });
    
    const totalCategories = await Category.countDocuments();
    const totalBookmarks = await Bookmark.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ isCompleted: true });
    const totalMealPlans = await MealPlan.countDocuments();
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newUsersThisMonth = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const newRecipesThisMonth = await Recipe.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    
    // Get top categories by recipe count
    const topCategories = await Recipe.aggregate([
      { $match: { isApproved: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { name: '$category.name', count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get average rating
    const avgRatingResult = await Recipe.aggregate([
      { $match: { isApproved: true, averageRating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: '$averageRating' } } }
    ]);
    const averageRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;
    
    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        admins: adminUsers,
        newThisMonth: newUsersThisMonth
      },
      recipes: {
        total: totalRecipes,
        approved: approvedRecipes,
        pending: pendingRecipes,
        featured: featuredRecipes,
        newThisMonth: newRecipesThisMonth,
        averageRating: Math.round(averageRating * 10) / 10
      },
      activity: {
        totalBookmarks: totalBookmarks,
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        totalMealPlans: totalMealPlans,
        totalCategories: totalCategories
      },
      topCategories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateUserReport, getReports, getSystemStats };