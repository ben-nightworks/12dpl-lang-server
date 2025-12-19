// Programmer   Lee Gregory
// Date
// 30/9/94
// Description of Macro
// A macro to label the spiral and curve lengths of
// an Alignment string (not for a Super Alignment)
// Note - This macro uses a Console.
//  There are very few Console macros since most people
// prefer to use full Panels as in 12d Model  itself.
// However Panel macros are more difficult to write since
// they are not sequential, but things can be filled in in
// any order in the panel.
//----------------------------------------------------------
void get_hip_info(Element align,Integer hip,Integer &type,
Real xval[],Real yval[],Real lengths[])
// -----------------------------------------------------------
//

//                  4  SC
//                  5  CS
//                  6  HIP
//    NOTE -
//   If the IP is an HIP only, 1-5 are all given the HIP co-ords.
//   If the IP has a curve and no spirals, 1 is set equal
//       to  4 (TC=SC), and 2 is set equal to 5 (CT=CS).
//    The curve radius, curve and spiral lengths are returned in
//     the array lengths[1...4]
//        position  1  circle radius
//                  2  circle length
//                  3  left spiral length
//                  4  right spiral length
//
// -----------------------------------------------------------
{
    Text hip_type;
    Integer ret;
    ret = Get_hip_type(align,hip,hip_type);
    // Get the co-ordinates of the special points for the HIP
    if(hip_type == "IP") {
        //  case of HIP only with no curve or spiral
        Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
        xval[6] = xip; yval[6] = yip;
        type = 0;
        // fill in other array positions - set them all to the HIP
        //   position
        xval[1] = xip; yval[1] = yip;
        xval[2] = xip; yval[2] = yip;
        xval[3] = xip; yval[3] = yip;
        xval[4] = xip; yval[4] = yip;
        xval[5] = xip; yval[5] = yip;
    } else if(hip_type == "Curve") {
        //  case of HIP with and curve and no spirals
        Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
        Real xtc,ytc;  ret = Get_hip_geom(align,hip,1,xtc,ytc);
        Real xct,yct;  ret = Get_hip_geom(align,hip,2,xct,yct);
        Real xcc,ycc;  ret = Get_hip_geom(align,hip,3,xcc,ycc);
        xval[1] = xtc; yval[1] = ytc;
        xval[2] = xct; yval[2] = yct;
        xval[3] = xcc; yval[3] = ycc;
        xval[6] = xip; yval[6] = yip;
        type = 2;
        // fill in the other array positions
        xval[4] = xtc; yval[4] = ytc;
        xval[5] = xct; yval[5] = yct;
    } else if(hip_type == "Spiral") {
        Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
        Real xts,yts;  ret = Get_hip_geom(align,hip,1,xts,yts);
        Real xsc,ysc;  ret = Get_hip_geom(align,hip,4,xsc,ysc);
        Real xcs,ycs;  ret = Get_hip_geom(align,hip,5,xcs,ycs);
        Real xst,yst;  ret = Get_hip_geom(align,hip,2,xst,yst);
        Real xcc,ycc;  ret = Get_hip_geom(align,hip,3,xcc,ycc);
        Integer left_spiral = ((xts != xsc) || (yts != ysc)) ? 1 : 0;
        Integer right_spiral= ((xst != xcs) || (yst != ycs)) ? 1 : 0;
        Integer curve       = ((xsc != xcs) || (ysc != ycs)) ? 1 : 0;
        xval[1] = xts; yval[1] = yts;
        xval[2] = xst; yval[2] = yst;
        xval[3] = xcc; yval[3] = ycc;
        xval[4] = xsc; yval[4] = ysc;
        xval[5] = xcs; yval[5] = ycs;
        xval[6] = xip; yval[6] = yip;
        type = 2*curve + 2*left_spiral + 2*right_spiral;
    }
    //  Get the curve radius, curve and spiral lengths
    Real x,y,radius,left_spiral,right_spiral;
    Get_hip_data(align,hip,x,y,radius,left_spiral,right_spiral);
    Real ch1,ch2,xf,yf,zf,dir,off;  // to get curve length
    if(radius != 0) {
        Drop_point(align,xval[4],yval[4],0.0,xf,yf,zf,ch1,dir,off);
        Drop_point(align,xval[5],yval[5],0.0,xf,yf,zf,ch2,dir,off);
        lengths[2] = ch2 - ch1;

    } else {
        lengths[2] = 0.0;

    }
    lengths[1] = radius;
    lengths[3] = left_spiral;
    lengths[4] = right_spiral;
    return;
}
Element position_text(Text text,Real size,Integer colour,Real x1,Real y1,Real x2,Real y2)
//
// -------------------------------------------------------------
// Routine to position text
// At the moment it centres it between (x1,y1) and (x2,y2)
// with (bottom,centre) justification
// -------------------------------------------------------------
{
    Real xpos,ypos,angle;
    xpos = 0.5 * (x1 + x2);
    ypos = 0.5 * (y1 + y2);
    angle = Atan2(y2 - y1,x2 - x1);
    Element elt = Create_text(text,xpos,ypos,size,colour,angle,4,1);
    return (elt);
}
{
    Text	program_name	= "12dF Check Exporter";
    Text    ver     		= "15.1";
    Text    td_ver 		= "v15";
    Integer Shutdown_code = 424242;
}

void main()
// -------------------------------------------------------------
//  Select an alignment string and then label it in plan with
//  spiral lengths, curve radii and tangent length.
//
//  The positions of the labels is midway between the
//  two critical points.
//

// -------------------------------------------------------------
{
    Integer ret;
    Element cl;
    Real    text_size;
    Integer colour;
    Text    colour_name,model_name;
    Model   model;
    Real
    x_prev_tangent,y_prev_tangent;
    // Get model for text
    model :
    Model_prompt("Model name for text ? ",model_name);
    if(!Model_exists(model_name)) goto model;
    model = Get_model(model_name);
    // Get text size
    text_size :
    if(Prompt("Text size ? ",text_size) != 0) goto text_size;
    // Get text colour

    text_colour:
    Colour_prompt("Colour for text ? ",colour_name);
    if(!Colour_exists(colour_name)) goto text_colour;
    if(Convert_colour(colour_name,colour) != 0) goto text_colour;
    // Get alignment string
    Prompt("Select alignment string");
    align:
    ret = Select_string("Select alignment string",cl);
    if(ret == -1) {
        Prompt("Finished");
        return;
    } else if(ret != 1) {
        Prompt("Try again ");
        goto align;

    }
    Text type_name;  Get_type(cl,type_name);
    if(type_name != "Alignment") {
        Prompt("not an alignment string - try again");
        goto align;
    }

    // query all alignment info
    Integer no_hip;
    Get_hip_points(cl,no_hip);
    if(no_hip <= 1) {
        Prompt("<= 1 HIP point");
        return;
    }
    // label the alignment
    for(Integer i=1;i<= no_hip;i++) {
        Integer  type;
        Real
        xval[6],yval[6],lengths[4];
        get_hip_info(cl,i,type,xval,yval,lengths);
        // label the spiral lengths and curve radius
        Real
        xpos,ypos,angle;
        Text
        text;
        Element  elt;
        Integer curve
        = (lengths[1] == 0) ? 0 : 1;
        Integer left_spiral  = (lengths[3] == 0) ? 0 : 1;
        Integer right_spiral = (lengths[4] == 0) ? 0 : 1;
        // label the left spiral length

        if(left_spiral) {
            text = "spiral length = " + To_text(lengths[3],1) + "m";
            elt = position_text(text,text_size,colour,xval[1],yval[1],xval[4],yval[4]);
            Set_model(elt,model);
        }
        // label the curve radius
        if(curve) {
            text = "Radius = " + To_text(lengths[1],1) + "m";
            elt = position_text(text,text_size,colour,xval[4],yval[4],xval[5],yval[5]);
            Set_model(elt,model);
        }
        // label the right spiral length
        if(right_spiral) {
            text = "spiral length = " + To_text(lengths[4],1) + "m";
            elt = position_text(text,text_size,colour,xval[5],yval[5],xval[2],yval[2]);
            Set_model(elt,model);
        }
        // label the tangent
        if(i==1) {
            x_prev_tangent = xval[6];
            y_prev_tangent = yval[6];
        } else {
            Real xx,yy,tangent;
            xx = xval[1] - x_prev_tangent;
            yy = yval[1] - y_prev_tangent;
            tangent = Sqrt(xx*xx+ yy*yy);
            text = "tangent length = " + To_text(tangent,1) + "m";
            elt = position_text(text,text_size,colour,x_prev_tangent,y_prev_tangent,xval[1],yval[1]);
            Set_model(elt,model);
            x_prev_tangent = xval[2];
            y_prev_tangent = yval[2];
        }
    }
    Prompt ("Finished");
}
