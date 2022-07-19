import './App.css';
import {ColorPicker, useColor} from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import {AppBar, Box, Container, Grid, styled, TextField, Toolbar} from "@mui/material";
import {useState} from "react";
import {AiOutlineCopyrightCircle} from "react-icons/ai";



/*
Issues:
special characters support: &k &l &u
output and preview scroll off-screen
padding between header and top rgb
header bar is not fixed
 */


function dv(color1,color2,word){
    // function that returns the slope of two vectors (color1,color2)

    const number = word.length;
    let r1 = color1.rgb.r;
    let g1 = color1.rgb.g;
    let b1 = color1.rgb.b;
    let r2 = color2.rgb.r;
    let g2 = color2.rgb.g;
    let b2 = color2.rgb.b;

    let unit_vector = [r2-r1,g2-g1,b2-b1];
    let r = unit_vector[0]/number;
    let g = unit_vector[1]/number;
    let b = unit_vector[2]/number;

    let start = [r1,g1,b1]
    let output = [];
    for (let i=0;i<number;i++){
        output.push([start[0],start[1],start[2]]);
        start[0]+=r;
        start[1]+=g;
        start[2]+=b;

    }


    const children = [];
    for(let i=0;i<output.length;i++){
        const lstyle = {color: `rgb(${output[i][0]},${output[i][1]},${output[i][2]})`};
        if(word[i]===" "){
            children.push(<p className={"letter_container space"} style={lstyle}> </p>)
        }
        else{
            children.push(<p className={"letter_container"} style={lstyle}>{word[i]}</p>)
        }
    }
    const text_container = <Grid item xs={12}><p className="output_header">Preview:</p><Box className={"text_container"}>{children}</Box></Grid>

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        //console.log("rgbToHex",r,g,b," Returned: #" + componentToHex(r) + componentToHex(g) + componentToHex(b));
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    //hex output
    const hex = []
    for(let i=0;i<output.length;i++){
        hex.push("#"+rgbToHex(output[i][0],output[i][1],output[i][2]))
    }
    const hex_container = <Grid item xs={12}><p className="output_header">Hex Output:</p><Box className={"hex_container"}>{hex}</Box></Grid>
    //minecraft format output

    const minecraft_output = [...hex]
    for(let i=0;i<minecraft_output.length;i++){
        minecraft_output[i]=minecraft_output[i].replace("#","")
        minecraft_output[i] = minecraft_output[i].split("")
        for(let j=0;j<minecraft_output[i].length;j++){
            minecraft_output[i][j] = "&" + minecraft_output[i][j];
        }
        minecraft_output[i] = minecraft_output[i].join("")
        minecraft_output[i]="&x"+minecraft_output[i]+word[i]
    }
    const minecraft_container = <Grid item xs={12}><p className="output_header">Minecraft Output:</p><Box className={"minecraft_container"}>{minecraft_output}</Box></Grid>

    return <Grid container spacing={2}>{text_container}{hex_container}{minecraft_container}</Grid>



}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'lightblue',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'lightblue',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#282828',
        },
        '&:hover fieldset': {
            borderColor: '#454545',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'lightblue',
        },
    },
});

export default function App() {
    const [color1, setColor1] = useColor("hex", "#ff0000");
    const [color2, setColor2] = useColor("hex", "#0000ff");
    const [word, setWord] = useState("Select two colors to begin");
    const onTextChange = (e: any) => setWord(e.target.value);

    const output = dv(color1,color2,word)

    return (
        <Box>
            <AppBar position="static">
                <Toolbar className={"header"}>{<p className={"title"}>Gradient Maker</p>}</Toolbar>
            </AppBar>
            <Container className="app_box" maxWidth="xl">
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ColorPicker height={400} width={700}
                                         color={color1}
                                         onChange={setColor1} hideHSV dark/>
                        </Grid>
                        <Grid item xs={6}>
                            <ColorPicker height={400} width={700}
                                         color={color2}
                                         onChange={setColor2} hideHSV dark/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box component="form">
                                <p className="output_header">Input Text:</p>
                                <CssTextField sx={{ input: { color: 'white'}}} margin="normal" fullWidth variant="outlined" value={word}
                                           onChange={onTextChange} />
                            </Box>
                        </Grid>
                        {output}
                    </Grid>
                </Box>
                <div className="footer">
                    <p> <AiOutlineCopyrightCircle /> 2022 Leo Adams & John Stromberg</p>
                </div>
            </Container>
        </Box>
    );
}
