
    <script>
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	var near=0.1;
	var far=10;
	var fov=1/Math.tan(45);
	var aspectRatio=canvas.width/canvas.height;
	var coords;
	var drawloop=setInterval(draw,15);
	var x=-110;
	var y=-100;
	var z=50;
	var points=[[]];
	var scale=1;
	var yOffset=45;
	var a=0;
	function draw(){
		a+=0.01;
	clear()
	   points=[[]]
	   for(z=400;z>=0;z-=10){
		   points[-z/10]=[];
		   for(x=-100;x<=100;x+=10){
			   y=20*Math.sin((x+0.5*z)/50+a)-5*Math.sin((x+0.5*z)/15+10*a)+2*Math.sin(x+0.5*z-10*a);
	points[-z/10][x/10+10]=new point(x,y,z,10,0,0,-1)
	//points[-z/10][x/10+10].show(); 
	if(x!=-100){
	//points[-z/10][x/10+10].connect(points[-z/10][x/10+9]);
	}
	if(z!=400){
			  //points[-z/10][x/10+10].connect(points[-z/10-1][x/10+10]); 
		   }
	if(x!=-100 && z!=400){
		points[-z/10][x/10+10].createPlane(points[-z/10-1][x/10+10],points[-z/10-1][x/10+9],points[-z/10][x/10+9])
	}
	}
	
		
	}
	   ctx.fillStyle="#ffffff";
	   ctx.fillText("",0,10);
	}
	function clear(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	function append(arr,item){
		arr[arr.length]=item;
	}
	function project(x,y,z){
		if(z<0){
			z=0;
		}
		var new_x=fov*aspectRatio*x;
		var new_y=fov*y;
		//var new_z=(far+near)/(far-near)*z+w;
		var new_w=2*near*far*z/(near-far);
		return [-new_x*canvas.width/(2*new_w)+canvas.width/2,new_y*canvas.height/(2*new_w)+canvas.height/2];
	}
	function point(x,y,z,r,vx,vy,vz){
		this.X=x;
		this.Y=y;
		this.Z=z;
		//this.initX=x;
		//this.initY=y;
		//this.initZ=z;
		this.vx=vx;
		this.vy=vy;
		this.vz=vz;
		this.projectedX=project(x,scale*y-yOffset,z)[0];
		this.projectedY=project(x,scale*y-yOffset,z)[1];
		this.r=r;
		if(this.r==null){
			this.r=0;
		}
		this.change=function(nx,ny,nz){
		 this.X=nx;
		this.Y=ny;
		this.Z=nz;   
		this.projectedX=project(nx,scale*ny-yOffset,nz)[0];
		this.projectedY=project(nx,scale*ny-yOffset,nz)[1];
		}
		this.show=function(){
		ctx.strokeStyle="#ffffff";
		ctx.fillStyle="#ffffff";
		ctx.beginPath();
		ctx.arc(this.projectedX,this.projectedY,20*this.r/Math.abs(this.Z),0,2*Math.PI);
		ctx.stroke();
		ctx.closePath();
		ctx.fill();
		}
		this.connect=function(other){
			ctx.strokeStyle="white";
			ctx.beginPath();
			ctx.moveTo(this.projectedX,this.projectedY);
			ctx.lineTo(other.projectedX,other.projectedY);
			ctx.stroke();
		}
		this.createPlane=function(p2,p3,p4){
			/*this.Vx=p2.initX-this.initX;
			this.Wx=p3.initX-this.initX;
			this.Vy=p2.initY-this.initY;
			this.Wy=p3.initY-this.initY;
			this.Vz=p2.initZ-this.initZ;
			this.Wz=p3.initZ-this.initZ;*/
			this.Vx=p2.X-this.X;
			this.Wx=p3.X-this.X;
			this.Vy=p2.Y-this.Y;
			this.Wy=p3.Y-this.Y;
			this.Vz=p2.Z-this.Z;
			this.Wz=p3.Z-this.Z;
			this.nX=this.Vy*this.Wz-this.Vz*this.Wy;
			this.nY=this.Vz*this.Wx-this.Wz*this.Vx;
			this.nZ=this.Vx*this.Wy-this.Wx*this.Vy;
			this.shade=510*(0.5*this.nZ/Math.sqrt(this.nZ*this.nZ+this.nX*this.nX)+0.5)*(0.5*this.nX/Math.sqrt(this.nZ*this.nZ+this.nX*this.nX+this.nY*this.nY)+0.5);
			ctx.fillStyle="rgba("+0.5*this.shade+","+0.5*this.shade+",255,1)";
			ctx.beginPath()
			ctx.moveTo(this.projectedX,this.projectedY)
			ctx.lineTo(p2.projectedX,p2.projectedY)
			ctx.lineTo(p3.projectedX,p3.projectedY)
			ctx.lineTo(p4.projectedX,p4.projectedY)
			ctx.closePath()
			ctx.fill()
		}
	}
</script>