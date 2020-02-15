// [离心机]Centrifuge
IDRegistry.genBlockID("centrifuge");
Block.createBlock("centrifuge",[
    {name:"Centrifuge",texture:[["machine_bottom",0],["centrifuge_top",0],["machine_side",0],["centrifuge",0],["machine_side",0],["machine_side",0]],inCreative:true}
],"opaque");
TileRenderer.setStandartModel(BlockID.centrifuge,[["machine_bottom",0],["centrifuge_top",0],["machine_side",0],["centrifuge",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.centrifuge,0,[["machine_bottom",0],["centrifuge_top",0],["machine_side",0],["centrifuge",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.centrifuge,4,[["machine_bottom",0],["centrifuge_top",1],["machine_side",0],["centrifuge",1],["machine_side",0],["machine_side",0]]);

ETMachine.setDrop("centrifuge",BlockID.machineCasing,1);
Callback.addCallback("PreLoaded",function(){
	Recipes.addShaped({id:BlockID.centrifuge,count:1,data:0},["cec","cdc","aba"],["a",ItemID.coilCopper,0,"b",ItemID.electricMotor,0,"c",ItemID.plateIron,0,"d",BlockID.machineCasing,1,"e",ItemID.circuit,0]);
});

var GuiCentrifuge = new UI.StandartWindow({
    standart:{
        header:{text:{text:Translation.translate("Centrifuge")}},
        inventory:{standart:true},
        background:{standart:true}
    },
    drawing:[
        {type:"bitmap",x:900,y:400,bitmap:"logo",scale:GUI_SCALE},
        {type:"bitmap",x:350,y:75,bitmap:"energy_scale_0",scale:GUI_SCALE},
        {type:"bitmap",x:600,y:175 + GUI_SCALE,bitmap:"arrow_0",scale:GUI_SCALE},
		{type:"bitmap",x:700 - GUI_SCALE * 4,y:75 - GUI_SCALE * 4,bitmap:"info_scale_small",scale:GUI_SCALE}
    ],
    elements:{
        "slotInput":{type:"slot",x:350 + GUI_SCALE * 43,y:175,bitmap:"blank_slot",scale:GUI_SCALE},
        "scaleArrow":{type:"scale",x:600,y:175 + GUI_SCALE,direction:0,value:0.5,bitmap:"arrow_1",scale:GUI_SCALE},
        "slotOutput1":{type:"slot",x:720,y:175,bitmap:"blank_slot",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput2":{type:"slot",x:780,y:175,bitmap:"blank_slot",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput3":{type:"slot",x:720,y:235,bitmap:"blank_slot",scale:GUI_SCALE,isValid:function(){return false;}},
        "slotOutput4":{type:"slot",x:780,y:235,bitmap:"blank_slot",scale:GUI_SCALE,isValid:function(){return false;}},
        "textEnergy":{type:"text",font:GUI_TEXT,x:700,y:75,width:300,height:30,text:Translation.translate("Energy: ") + "0/0Eu"},
        "scaleEnergy":{type:"scale",x:350 + GUI_SCALE * 6,y:75 + GUI_SCALE * 6,direction:1,value:0.5,bitmap:"energy_scale_1",scale:GUI_SCALE}
    }
});

ETMachine.registerMachine(BlockID.centrifuge,{
    defaultValues:{
        meta:0,
        tier:2,
        progress:0,
        work_time:320,
        isActive:false,
        energy_consumption:4
    },

    tick:function(){
        var input = this.container.getSlot("slotInput"),recipe = ETRecipe.getRecipeResult("Centrifuge",input.id,input.data);

        if(recipe && this.data.energy >= this.data.energy_consumption){
            this.data.energy -= this.data.energy_consumption;
            this.data.progress += 1 / this.data.work_time;
            this.setActive(true);
            if(this.data.progress.toFixed(3) >= 1){
                if(recipe[0]){this.setOutput("slotOutput1",recipe[0].id,recipe[0].count,recipe[0].data);}
                if(recipe[1]){this.setOutput("slotOutput2",recipe[1].id,recipe[1].count,recipe[1].data);}
                if(recipe[2]){this.setOutput("slotOutput3",recipe[2].id,recipe[2].count,recipe[2].data);}
                if(recipe[3]){this.setOutput("slotOutput3",recipe[3].id,recipe[3].count,recipe[3].data);}
                input.count--;
                this.container.validateAll();
                this.data.progress = 0;
            }
        } else if(this.data.progress > 0){
            this.data.progress -= 1 / this.data.work_time;
            this.setActive(false);
        }

        this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
        this.container.setScale("scaleArrow",Math.round(this.data.progress / 1 * 22) / 22);
        this.container.setText("textEnergy",Translation.translate("Energy: ") + this.data.energy + "/" + this.getEnergyStorage() + "Eu");
    },

    energyReceive:ETMachine.energyReceive,
    getGuiScreen:function(){return GuiCentrifuge;},
    getTransportSlots:function(){return {input:["slotInput"],output:["slotOutput"]};}
});
TileRenderer.setRotationPlaceFunction(BlockID.centrifuge);