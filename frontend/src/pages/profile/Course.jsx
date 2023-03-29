import React from 'react';
import { FormControl, InputAdornment, ListItemIcon, ListItemText, List, ListItem, ListItemButton, Paper, IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { axiosGetCourse, axiosUpdateCourse } from '../../apis/endpoint';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUser } from '../../context/User';

const Course = () => {
  const {user, updateCourse} = useUser();
  const {course} = user;
  const [courseInp, setCourseInp] = useState('');

  async function postCourse(bodyData){
    const res = await axiosUpdateCourse(bodyData);
    if(res.status === 200)
      updateCourse(bodyData.course);
  }

  function deleteCourse(courseName){
    const bodyData = {
      course: course.filter(course => course !== courseName)
    }
    postCourse(bodyData)
  }

  function updateCourseName(e){
    e.preventDefault();
    if(!courseInp || course.includes(courseInp)) return;
    const bodyData = {
      course: [...course, courseInp]
    }
    postCourse(bodyData)
    setCourseInp('')
  }

  return (
    <>
      <form className=' flex flex-col-reverse gap-2 lg:flex-row' onSubmit={updateCourseName}>
        <div className='flex flex-col items-center gap-5'>
          <div>
            <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                <TextField
                  id="email"
                  label="Courses"
                  value={courseInp}
                  onChange={(e) => {setCourseInp(e.target.value)}}
                  InputLabelProps={{
                    className: '!text-primary'
                  }}
                  InputProps={{
                    className: '!text-primary',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type='submit'>
                          {<CheckCircleIcon className='text-success' />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
            </FormControl>
          </div>
        </div>
      </form>
      <Paper className='w-full h-[450px] p-4 !text-primary !bg-secondary shadow-xl overflow-auto' variant='outlined'>
        <List>
          {course?.map(course => (
            <ListItem key={course} className='bg-primary rounded-sm my-2 !text-secondary'>
              <ListItemText>{course}</ListItemText>
              <ListItemIcon>
                <IconButton onClick={deleteCourse.bind(null, course)}>
                  <CancelIcon className='text-danger' />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default Course
