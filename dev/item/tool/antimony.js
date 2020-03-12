CreateTool("Antimony",{durability:512,level:3,efficiency:12,damage:2,enchantability:20});

Callback.addCallback("PreLoaded",function(){
    var file = ETTool.getAllTool("File"),hammer = ETTool.getAllTool("Hammer");
    for(let i = 0;i < file.length;i++){
        for(let ii = 0;ii < hammer.length;ii++){
            ETRecipe.addShapedRecipe({id:ItemID.swordAntimony,count:1,data:0},["cad"," a "," b "],["a",ItemID.plateAntimony,0,"b",280,0,"c",file[i],0,"d",hammer[ii],0],{0:1,2:1});
            ETRecipe.addShapedRecipe({id:ItemID.shovelAntimony,count:1,data:0},["cad"," b "," b "],["a",ItemID.plateAntimony,0,"b",280,0,"c",file[i],0,"d",hammer[ii],0],{0:1,2:1});
            ETRecipe.addShapedRecipe({id:ItemID.pickaxeAntimony,count:1,data:0},["aca","dbe"," b "],["a",ItemID.plateAntimony,0,"b",280,0,"c",ItemID.ingotAntimony,0,"d",file[i],0,"e",hammer[ii],0],{3:1,5:1});
            ETRecipe.addShapedRecipe({id:ItemID.axeAntimony,count:1,data:0},["acd","abe"," b "],["a",ItemID.plateAntimony,0,"b",280,0,"c",ItemID.ingotAntimony,0,"d",file[i],0,"e",hammer[ii],0],{2:1,5:1});
            ETRecipe.addShapedRecipe({id:ItemID.hoeAntimony,count:1,data:0},["aac","db "," b "],["a",ItemID.plateAntimony,0,"b",280,0,"c",file[i],0,"d",hammer[ii],0],{2:1,3:1});
        }
    }
});