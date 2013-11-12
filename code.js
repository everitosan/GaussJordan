	var s;
var n;
var ident=1;
var cache=window.applicationCache;

//cache.addEventListener('updateready', actualiza(),false);

function actualiza(){

	cache.swapCache();
}

	

function creasistema(uno)
{
	if(document.getElementById('g').value=="")
		return false
	document.getElementById('g').blur();

	animacion(uno);
	
	n = document.getElementById("g");
	var chk=document.getElementById("Bres");
	//var node = n.parentNode;
	if(chk)
	{	ident=0;
		borrar();
		ident=1;
	}
	
	var node = document.getElementById("sistema");
	var boton=document.createElement("div");
	var del=document.createElement("div");
	n=n.value;
	
	

	var le=new Array(n);
	var e= new Array(n);
	var salto=new Array(n);
	var i,j;


	for(i=0;i<n;i++)
		{	
			e[i]=new Array(n+1);

		}


	for(i=0;i<n;i++)
		{	
			le[i]=document.createElement("label");
			salto[i]=document.createElement("br");
			
			for(j=0;j<=n;j++)
			{	
				e[i][j]=document.createElement("input");
			}	
		}

	for(i=0;i<n;i++)
		{	
			le[i].innerHTML=i+1;
			for(j=0;j<=n;j++)
			{	
				e[i][j].size="5";
				if(screen.width<640)
                 e[i][j].type="number";
             	else
             	e[i][j].type="text";

				e[i][j].name=i+1;
				if(j<n)
				{
					e[i][j].setAttribute('placeholder',"±X"+(j+1));
				}
				else{e[i][j].setAttribute('placeholder',"±R"+(i+1));}
			
			}


		}

	for(i=0;i<n;i++)
		{	
			node.appendChild(le[i]);
			for(j=0;j<=n;j++)
			{	
				node.appendChild(e[i][j]);

			}
			node.appendChild(salto[i]);
		}

		boton.innerHTML="Resolver";
		boton.className="button";
		boton.id="Bres";
		boton.setAttribute('onclick','calc()');

		del.innerHTML="Borrar";
		del.className="button";
		del.setAttribute('onClick','borrar()');

		node.appendChild(del);
		node.appendChild(boton);
	
	
}

function calc()
{

	//alert("calculando");
	s=new Array(n);
	
	var l;
	var i;
	var j;
	var z;

	l=new Array(n);


	for(i=0;i<n;i++)
		{
			s[i]=new Array(n+1);
			l[i]=document.getElementsByName(i+1);
		}


		for(i=0;i<n;i++)
		{	
			for(j=0;j<=n;j++)
				{
					if(l[i][j].value.length==0)
						{s[i][j]=0;}
					else{s[i][j]=l[i][j].value;}

					s[i][j]=parseFloat(s[i][j]);
					
				}
		}

		//comieza el cálculo del sistema
		j=0;
		var aux;
		for(i=0;i<n;i++)
		{	
				aux=s[i][i];
				for(j=0;j<=n;j++)
				{
					//alert(s[i][j]+" / "+aux+"=");
					s[i][j]= s[i][j] /  aux;
					//alert(s[i][j]);
				}
			
		//nuevo recorrido para hacer ceros
				for(z=0;z<n;z++)//salto de linea  
					{ aux=s[z][i];
					for(j=0;j<= n;j++)//desplaza por la linea
							{	if(i!=z)
								{
									
									//alert(s[i][j]+" * "+aux+" - "+s[z][j]+" = ");
									
									
									s[z][j]=(s[i][j]*aux)-s[z][j];
									//alert(s[z][j]);

								}
							}
					}	

				
		}


		//contenida la solución, se normalizan las lineas

		for(i=0;i<n;i++	)
			{
				if(s[i][i] < 0)
				{
					s[i][i]=s[i][i]*(-1);
					s[i][n]=s[i][n]*(-1);
				}
			}


		imprimir();

		
}

function imprimir()
{

	var lugar=document.getElementById("res");
	var p= new Array(n);
	var di=document.createElement("div");
	var ic=document.createElement("img");
	ic.src="img/drawer.png";
	ic.setAttribute('onclick', 'save(this)');
	di.className="res";
	var i, aux;
   
	for(i=0;i<n;i++)
	{
		
		p[i]=document.createElement("p");
		
		if( isNaN(s[i][i]) || isNaN(s[i][n]))
			return false;
		else
		{
			aux=s[i][i]+" X"+(i+1)+" = "+s[i][n];
			p[i].innerHTML=aux;
		}
				
	}

	for(i=0;i<n;i++)
	{
		di.appendChild(p[i]);
		di.appendChild(ic);
	}

		lugar.appendChild(di);
		window.scrollTo(0,document.body.offsetHeight);
}

function borrar()
{

	if(ident==1)alert("Se limpiará todo el contenido");
	var del1=document.getElementById("sis");
	var del2=document.getElementById("res");
	var act=document.getElementById("g");
	var n1=document.createElement("article");
	var form=document.createElement("form");
	var n2=document.createElement("article");
	var parent=del1.parentNode;

	parent.removeChild(del1);
	parent.removeChild(del2);

	n1.id="sis";
	n2.id="res";

	form.id="sistema";
	form.setAttribute('autocomplete','off');

	n1.appendChild(form);

	parent.appendChild(n1);
	parent.appendChild(n2);

	if(ident==1)act.value=" ";
}

function animacion(uno)
{
	document.getElementById('g').style.width="50%";
	document.getElementById('g').style.display="inline-block";
	document.getElementById('g').style.margin="2em 0";
	uno.parentNode.parentNode.className="cl";
}

function save(ref)
{
	ref.style.display="none";
	

	var pre=localStorage.getItem('notes');
	var n=ref.parentNode

	if(pre!=null)
		pre=pre+n.innerHTML;
	else
		pre=n.innerHTML;

	localStorage.setItem('notes', pre);
	notas.innerHTML=localStorage.getItem('notes');


	//ref.setAttribute('onclick', 'deleteitem()' );
	console.log(notas.childNodes[notas.childNodes.length-1]);
	notas.childNodes[notas.childNodes.length-1].src="img/drawer3.png";
	notas.childNodes[notas.childNodes.length-1].style.display="block";
	notas.childNodes[notas.childNodes.length-1].setAttribute('onclick', 'deleteitem()' );
	
}

window.onload=function(){
	var notas=document.getElementById('notas');
	var b=document.getElementById('botones');
	
	b.childNodes[1].addEventListener('click', function(){
		(notas.style.display=="block")? notas.style.display="none":notas.style.display="block";
	}, false);

	if(localStorage.getItem('notes'))
	{
		notas.innerHTML=localStorage.getItem('notes');
		
	}
	
}

function deleteitem()
{
	alert('se perderá el registro');
}