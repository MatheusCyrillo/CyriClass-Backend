import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const transaction = await db.transaction();

    try{
      const insertedUsersIds = await transaction('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
  
      const user_id = insertedUsersIds[0];
  
      const insertedClassesIds = await transaction('classes').insert({
        subject,
        cost,
        user_id
      });
  
      const class_id = insertedClassesIds[0];
  
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return{
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      })
  
      await transaction('class_schedule').insert(classSchedule);
  
      await transaction.commit();
  
      return response.status(201).send();
    } catch (err) {
      await transaction.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
 
  });
  

  export default routes;