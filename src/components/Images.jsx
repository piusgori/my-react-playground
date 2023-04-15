import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, IconButton } from '@mui/material';
import { Image } from '@mui/icons-material';

const MainBox = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
}));

const ImageDocContainer = styled(Box)(() => ({
  height: 300,
  widht: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  border: '3px solid #787878',
  cursor: 'pointer',
  position: 'relative'
}));

const ImageDocument = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const ImageReplacement = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  background: 'rgba(0, 0, 0, .25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute'
}))

function Images() {

  const imageAddress = 'https://cdn.pixabay.com/photo/2023/04/10/10/28/insect-7913415_960_720.jpg';
  const [images, setImages] = useState([
    { initial: '', current: '', ref: useRef(), image: '', name: '' },
    { initial: '', current: '', ref: useRef(), image: '', name: '' },
    { initial: imageAddress, current: '', ref: useRef(), image: '', name: '' },
    { initial: '', current: '', ref: useRef(), image: '', name: '' },
    { initial: imageAddress, current: '', ref: useRef(), image: '', name: '' },
    { initial: '', current: '', ref: useRef(), image: '', name: '' },
  ]);

  const selectImageHandler = (index, event) => {
    if (event.target.files && event.target.files.length === 1) {
      const imageFile = event.target.files[0];
      const imageName = event.target.files[0].name;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImages(prev => {
          const newArray = prev;
          newArray[index] = { ...newArray[index], current: fileReader.result, image: imageFile, name: imageName };
          return newArray;
        });
      };
      fileReader.readAsDataURL(imageFile);
    }
  }

  return (
    <MainBox>
      <Grid sx={{ padding: 5 }} container spacing={3}>
        {images.map((each, index) => {
          const [isHovering, setIsHovering] = useState(false);
          return (
            <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <ImageDocContainer onMouseOver={() => { setIsHovering(true) }} onMouseLeave={() => { setIsHovering(false) }}>
                {(each.current || each.initial) && <ImageDocument src={each.current || each.initial || ''} alt='document' />}
                {(isHovering || (!each.initial && !each.current)) && <ImageReplacement>
                  <IconButton onClick={() => { each.ref.current.click() }}><Image sx={{ color: (each.initial || each.current) ? 'white' : 'black' }} /></IconButton>
                </ImageReplacement>}
              </ImageDocContainer>
              <input style={{ display: 'none' }} onChange={(e) => selectImageHandler(index, e)} type='file' ref={each.ref} accept='.jpg,.jpeg,.png' />
            </Grid>
          )
        })}
      </Grid>
    </MainBox>
  )
}

export default Images;