var UseCases4 = {
  "mix": [{
    "name": "mix search identifiers",
    "type": "0",
    "source": "",
    "searchTerm": "RAG1_HUMAN,ENSMUSG00000023456,GO:0002020,AC020895,hsa:7409",
    "mapFilterTerm": ""
  }, {
    "name": "mix proteins to go term biological",
    "type": "1",
    "source": "",
    "searchTerm": "SHH_HUMAN,P53_HUMAN,RAG1_HUMAN",
    "mapFilterTerm": "map(go).filter(go.type==\"biological_process\")"
  }, {
    "name": "mix cancer related genes to protein mutation features",
    "type": "1",
    "source": "hgnc",
    "searchTerm": "PMS2,MLH1,MSH2,MSH6,STK11,BMPR1A,SMAD4,BRCA1,BRCA2,TP53,PTEN,PALB2,TSC1,TSC2,FLCN,MET,CDKN2A,RB1",
    "mapFilterTerm": "map(uniprot).map(ufeature).filter(ufeature.type==\"mutagenesis site\")"
  }, {
    "name": "mix proteins to interpro with Domain type",
    "type": "1",
    "source": "",
    "searchTerm": "SHH_HUMAN,P53_HUMAN,RAG1_HUMAN,CLOCK_HUMAN,BMAL1_HUMAN,AICDA_HUMAN,AT5G3_HUMAN",
    "mapFilterTerm": "map(interpro).filter(interpro.type==\"Domain\")"
  }, {
    "name": "mix taxid to its grand children by division",
    "type": "1",
    "source": "",
    "searchTerm": "862507",
    "mapFilterTerm": "map(taxchild).map(taxchild).filter(taxonomy.taxonomic_division==\"ROD\")"
  }],
  "protein": [{
    "name": "protein search identifiers",
    "type": "0",
    "source": "",
    "searchTerm": "rag1_human,clock_human,bmal1_human,shh_human,aicda_human,at5g3_human,p53_HUMAN",
    "mapFilterTerm": ""
  }, {
    "name": "protein search \u0026 filter by name",
    "type": "1",
    "source": "",
    "searchTerm": "rag1_human,clock_human,bmal1_human,shh_human,aicda_human,at5g3_human,p53_HUMAN",
    "mapFilterTerm": "filter(\"Sonic hedgehog protein\" in uniprot.names)"
  }, {
    "name": "protein search \u0026 filter by sequence mass",
    "type": "1",
    "source": "",
    "searchTerm": "rag1_human,clock_human,bmal1_human,shh_human,aicda_human,at5g3_human,p53_human",
    "mapFilterTerm": "filter(uniprot.sequence.mass \u003e 45000)"
  }, {
    "name": "protein human proteins by sequence size",
    "type": "1",
    "source": "",
    "searchTerm": "homo sapiens",
    "mapFilterTerm": "map(uniprot).filter(size(uniprot.sequence.seq) \u003e 400)"
  }, {
    "name": "protein go term molecular",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,P53_HUMAN",
    "mapFilterTerm": "map(go).filter(go.type==\"molecular_function\")"
  }, {
    "name": "protein go term cellular",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,P53_HUMAN",
    "mapFilterTerm": "map(go).filter(go.type==\"cellular_component\")"
  }, {
    "name": "protein go term boolean",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,P53_HUMAN",
    "mapFilterTerm": "map(go).filter(go.name.contains(\"binding\") || go.name.contains(\"activity\"))"
  }, {
    "name": "protein filter first then go terms contains word",
    "type": "1",
    "source": "",
    "searchTerm": "SHH_HUMAN,P53_HUMAN,RAG1_HUMAN,CLOCK_HUMAN,BMAL1_HUMAN,AICDA_HUMAN,AT5G3_HUMAN",
    "mapFilterTerm": "filter(size(uniprot.sequence.seq) \u003e 400).map(go).filter(go.name.contains(\"binding\") || go.name.contains(\"activity\"))"
  }, {
    "name": "protein interpro Conserved site",
    "type": "1",
    "source": "",
    "searchTerm": "SHH_HUMAN,P53_HUMAN,RAG1_HUMAN,CLOCK_HUMAN,BMAL1_HUMAN,AICDA_HUMAN,AT5G3_HUMAN",
    "mapFilterTerm": "map(interpro).filter(interpro.type==\"Conserved_site\")"
  }, {
    "name": "protein ENA type mRNA",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ena).filter(ena.type==\"mrna\")"
  }, {
    "name": "protein ENA type genomic DNA",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ena).filter(ena.type==\"genomic_dna\")"
  }, {
    "name": "protein to refseqs",
    "type": "1",
    "source": "",
    "searchTerm": "RAG1_HUMAN,CLOCK_HUMAN,BMAL1_HUMAN,SHH_HUMAN,AICDA_HUMAN,AT5G3_HUMAN,P53_HUMAN",
    "mapFilterTerm": "map(refseq)"
  }, {
    "name": "protein cancer related gene variants",
    "type": "1",
    "source": "hgnc",
    "searchTerm": "PMS2,MLH1,MSH2,MSH6,STK11,BMPR1A,SMAD4,BRCA1,BRCA2,TP53,PTEN,PALB2,TSC1,TSC2,FLCN,MET,CDKN2A,RB1",
    "mapFilterTerm": "map(uniprot).filter(uniprot.reviewed).map(ufeature).map(variantid)"
  }, {
    "name": "protein feature helix type",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.type==\"helix\")"
  }, {
    "name": "protein feature sequence variant",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.type==\"sequence variant\")"
  }, {
    "name": "protein genes to mutation feature or contains",
    "type": "1",
    "source": "",
    "searchTerm": "her2,ras,p53",
    "mapFilterTerm": "map(uniprot).map(ufeature).filter(ufeature.type==\"mutagenesis site\" || ufeature.description.contains(\"cancer\"))"
  }, {
    "name": "protein feature location",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.location.begin\u003e0 \u0026\u0026 ufeature.location.end\u003c300)"
  }, {
    "name": "protein feature description contains",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.description.contains(\"tumor\"))"
  }, {
    "name": "protein feature specific variant",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.original==\"I\" \u0026\u0026 ufeature.variation==\"S\")"
  }, {
    "name": "protein feature maps variantid",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.original==\"I\" \u0026\u0026 ufeature.variation==\"S\").map(variantid)"
  }, {
    "name": "protein feature has evidences",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(size(ufeature.evidences)\u003e1)"
  }, {
    "name": "protein feature has experimental evidence",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.evidences.exists(a,a.type==\"ECO:0000269\"))"
  }, {
    "name": "protein feature has pubmed evidence",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.evidences.exists(a,a.source==\"pubmed\"))"
  }, {
    "name": "protein feature pdb evidence",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(ufeature).filter(ufeature.evidences.exists(a,a.source==\"pdb\"))"
  }, {
    "name": "protein pdb method NMR",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(pdb).filter(pdb.method==\"nmr\")"
  }, {
    "name": "protein pdb chains",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(pdb).filter(pdb.chains==\"A/C=95-292\")"
  }, {
    "name": "protein pdb resolution",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(pdb).filter(pdb.resolution==\"2.60 A\")"
  }, {
    "name": "protein pdb method or chains",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(pdb).filter(pdb.method==\"nmr\" || pdb.chains==\"C/D=1-177\")"
  }, {
    "name": "protein reactome activation pathways",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(reactome).filter(reactome.pathway.contains(\"activation\"))"
  }, {
    "name": "protein reactome signaling pathways",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(reactome).filter(reactome.pathway.contains(\"signaling\"))"
  }, {
    "name": "protein reactome regulation pathways",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(reactome).filter(reactome.pathway.contains(\"Regulation\"))"
  }, {
    "name": "protein orphanet disease name",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(orphanet).filter(orphanet.disease.contains(\"cancer\"))"
  }, {
    "name": "protein durgs by drugbank",
    "type": "1",
    "source": "",
    "searchTerm": "shh_human,p53_human",
    "mapFilterTerm": "map(drugbank)"
  }],
  "chembl": [{
    "name": "chembl search target",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL2242",
    "mapFilterTerm": ""
  }, {
    "name": "chembl search target component",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL_TC_47",
    "mapFilterTerm": ""
  }, {
    "name": "chembl target single protein to uniprot",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL2789",
    "mapFilterTerm": "filter(chembl.target.type==\"single_protein\").map(chembl_target_component).map(uniprot)"
  }, {
    "name": "chembl cancer related genes to targets",
    "type": "1",
    "source": "",
    "searchTerm": "PMS2,MLH1,MSH2,MSH6,STK11,BMPR1A,SMAD4,BRCA1,BRCA2,TP53,PTEN,PALB2,TSC1,TSC2,FLCN,MET,CDKN2A,RB1",
    "mapFilterTerm": "map(uniprot).map(chembl_target_component).map(chembl_target)"
  }, {
    "name": "chembl cancer related genes to target with type",
    "type": "1",
    "source": "hgnc",
    "searchTerm": "PMS2,MLH1,MSH2,MSH6,STK11,BMPR1A,SMAD4,BRCA1,BRCA2,TP53,PTEN,PALB2,TSC1,TSC2,FLCN,MET,CDKN2A,RB1",
    "mapFilterTerm": "map(uniprot).map(chembl_target_component).map(chembl_target).filter(chembl.target.type==\"protein-protein_interaction\")"
  }, {
    "name": "chembl search molecule",
    "type": "0",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": ""
  }, {
    "name": "chembl search molecule by smiles",
    "type": "0",
    "source": "",
    "searchTerm": "Cn1cc(c2ccc3N(CCc3c2)C(=O)Cc4cccc(c4)C(F)(F)F)c5c(N)ncnc15",
    "mapFilterTerm": ""
  }, {
    "name": "chembl search molecule by inchi key",
    "type": "0",
    "source": "",
    "searchTerm": "SIXVRXARNAVBTC-UHFFFAOYSA-N",
    "mapFilterTerm": ""
  }, {
    "name": "chembl molecule activities",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity)"
  }, {
    "name": "chembl molecule activities filter bao",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity).filter(chembl.activity.bao==\"BAO_0000190\")"
  }, {
    "name": "chembl molecule activities filter value",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity).filter(chembl.activity.value \u003e 10.0)"
  }, {
    "name": "chembl molecule activities AND",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity).filter(chembl.activity.value \u003e 10.0 \u0026\u0026 chembl.activity.bao==\"BAO_0000190\")"
  }, {
    "name": "chembl molecule activities OR",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity).filter(chembl.activity.value\u003e10.0 || chembl.activity.pChembl\u003e5.0)"
  }, {
    "name": "chembl molecule targets",
    "type": "1",
    "source": "",
    "searchTerm": "GSK2606414",
    "mapFilterTerm": "map(chembl_activity).map(chembl_document).map(chembl_assay).map(chembl_target)"
  }, {
    "name": "chembl search document",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": ""
  }, {
    "name": "chembl document activities",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL1121978",
    "mapFilterTerm": "map(chembl_activity)"
  }, {
    "name": "chembl document assay",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay)"
  }, {
    "name": "chembl document assay filter",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).filter(chembl.assay.type==\"Functional\" || chembl.assay.type==\"Binding\")"
  }, {
    "name": "chembl document cell line",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_cell_line)"
  }, {
    "name": "chembl document cell line Filter",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_cell_line).filter(chembl.cellLine.tax==\"9615\" || chembl.cellLine.efo==\"EFO_0002841\")"
  }, {
    "name": "chembl document target",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_target)"
  }, {
    "name": "chembl document target protein type",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_target).filter(chembl.target.type==\"single_protein\")"
  }, {
    "name": "chembl document target tissue",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_target).filter(chembl.target.type==\"tissue\")"
  }, {
    "name": "chembl document target organism",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_target).filter(chembl.target.type==\"organism\")"
  }, {
    "name": "chembl document target protein uniprot",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_assay).map(chembl_target).map(chembl_target_component).map(uniprot)"
  }, {
    "name": "chembl document molecule",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_molecule)"
  }, {
    "name": "chembl document molecule filter",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3421631",
    "mapFilterTerm": "map(chembl_molecule).filter(chembl.molecule.heavyAtoms \u003c 30.0 \u0026\u0026 chembl.molecule.aromaticRings \u003c2.0)"
  }, {
    "name": "chembl search assay",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL615156",
    "mapFilterTerm": ""
  }, {
    "name": "chembl assay target",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL615156",
    "mapFilterTerm": "map(chembl_target)"
  }, {
    "name": "chembl assay cell line",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3424821",
    "mapFilterTerm": "map(chembl_cell_line)"
  }, {
    "name": "chembl assay target protein",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL615156",
    "mapFilterTerm": "map(chembl_target).filter(chembl.target.type==\"single_protein\")"
  }, {
    "name": "chembl assay target protein uniprot",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL615156",
    "mapFilterTerm": "map(chembl_target).map(chembl_target_component).map(uniprot)"
  }, {
    "name": "chembl search activity",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL_ACT_93229",
    "mapFilterTerm": ""
  }, {
    "name": "chembl activity molecule with filter",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL_ACT_93229",
    "mapFilterTerm": "filter(chembl.activity.bao==\"BAO_0000179\").map(chembl_molecule)"
  }, {
    "name": "chembl search cell line",
    "type": "0",
    "source": "",
    "searchTerm": "CHEMBL3307241",
    "mapFilterTerm": ""
  }, {
    "name": "chembl search cell line assay",
    "type": "1",
    "source": "",
    "searchTerm": "CHEMBL3307241",
    "mapFilterTerm": "map(chembl_assay)"
  }],
  "taxonomy": [{
    "name": "taxonomy taxonomy children",
    "type": "1",
    "source": "",
    "searchTerm": "9606",
    "mapFilterTerm": "map(taxchild)"
  }, {
    "name": "taxonomy  taxonomy grand children",
    "type": "1",
    "source": "",
    "searchTerm": "862507",
    "mapFilterTerm": "map(taxchild).map(taxchild)"
  }, {
    "name": "taxonomy taxonomy grand^2 parent",
    "type": "1",
    "source": "",
    "searchTerm": "10090",
    "mapFilterTerm": "map(taxparent).map(taxparent).map(taxparent)"
  }, {
    "name": "taxonomy taxonomy Asian children",
    "type": "1",
    "source": "",
    "searchTerm": "10090",
    "mapFilterTerm": "map(taxchild).filter(taxonomy.common_name.contains(\"Asian\"))"
  }, {
    "name": "taxonomy taxonomy European children",
    "type": "1",
    "source": "",
    "searchTerm": "10090",
    "mapFilterTerm": "map(taxchild).filter(taxonomy.common_name.contains(\"European\"))"
  }, {
    "name": "taxonomy go term parent",
    "type": "1",
    "source": "",
    "searchTerm": "GO:0004707",
    "mapFilterTerm": "map(goparent)"
  }, {
    "name": "taxonomy go term parent type",
    "type": "1",
    "source": "",
    "searchTerm": "GO:0004707",
    "mapFilterTerm": "map(goparent).filter(go.type==\"biological_process\")"
  }, {
    "name": "taxonomy efo disaease name",
    "type": "0",
    "source": "",
    "searchTerm": "inflammatory bowel disease",
    "mapFilterTerm": ""
  }, {
    "name": "taxonomy efo children",
    "type": "1",
    "source": "",
    "searchTerm": "EFO:0003767",
    "mapFilterTerm": "map(efochild)"
  }, {
    "name": "taxonomy efo parent",
    "type": "1",
    "source": "",
    "searchTerm": "EFO:0000384",
    "mapFilterTerm": "map(efoparent)"
  }, {
    "name": "taxonomy eco children",
    "type": "1",
    "source": "",
    "searchTerm": "ECO:0000269",
    "mapFilterTerm": "map(ecochild)"
  }, {
    "name": "taxonomy eco parent",
    "type": "1",
    "source": "",
    "searchTerm": "ECO:0007742",
    "mapFilterTerm": "map(ecoparent)"
  }]
};

export default UseCases4;