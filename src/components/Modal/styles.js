import styled from 'styled-components'



//Neste caso do CSS do input só vai ser aplicado no input que esta dentro do form
//Exemplo do CSS normal: form input {}

//button:hover {}
//Dentro do button utilizar &:hover



export const DivModal  = styled.div`


width: 100%;
height: 100vh;
position: absolute;
top: 0;
left: 0;
z-index: 10;
background-color: rgba(0,0,0,0.8);
display: flex;
justify-content: center;
align-items: center;

h2{


}

.dados{

  
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 10px;
  white-space: nowrap;
  margin: 0 auto;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

span{

  font-size: 1.2rem;

}

.container{
background-color: #FFF;
color: #000;
width: 70%;
height: 70%;
border-radius: 20px;
background-color: #d3d3d3;

}

.sort{

  display: flex;
  justify-content: center;
  margin-left: 40%;
}

.close {

background-color: transparent;
outline: none;
width: 32px;
height: 32px;
border: none;
right: calc(-100% + 64px);
top: 16px;
cursor: pointer;
display: flex;
position: relative;
align-items: center;


&:before,
&:after{
  content: ' ';
  position: absolute;
  width: 2.5px;
  height: 24px;
  background-color: #000;
}
&:before {

  transform: rotate(45deg)

}

&:after{

  transform: rotate(-45deg)

}


}



`





