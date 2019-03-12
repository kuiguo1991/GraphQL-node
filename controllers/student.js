
const Student = require("../schema/student");


/**
  * @api {post} /savestudent 保存学生数据的方法
  * @apiDescription /savestudent
  * @apiName savestudent
  * @apiGroup students
  * @apiVersion 1.0.0
  */
export const saveStudent = async (ctx, next) => {
  // 获取前端请求的数据
  const opts = ctx.request.body;

  const student = new Student(opts);
  const saveStudent = await student.save(); // 保存数据
  if (saveStudent) {
    ctx.body = {
      success: true,
      student: saveStudent
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

// 查询所有学生的数据

/**
 * @api {get} /student 查询所有学生的数据
 * @apiDescription /student
 * @apiName student
 * @apiGroup students
 * @apiVersion 1.0.0
 */
export const fetchStudent = async (ctx, next) => {
    const students = await Student.find({})

    if (students.length) {
        ctx.body = {
            success: true,
            student: students
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

// 查询学生的数据以及附加数据

/**
 * @api {get} /studentDetail 查询学生的数据以及附加数据
 * @apiDescription /studentDetail
 * @apiName studentDetail
 * @apiGroup students
 * @apiVersion 1.0.0
 */
export const fetchStudentDetail = async (ctx, next) => {

    // 利用populate来查询关联info的数据
    const students = await Student.find({}).populate({
        path: 'info',
        select: 'hobby height weight'
    }).exec()

    if (students.length) {
        ctx.body = {
            success: true,
            student: students
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}