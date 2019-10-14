package main

import (
	"biobtree/conf"
	"biobtree/generate"
	"biobtree/service"
	"biobtree/update"
	"fmt"
	"log"
	"os"
	"runtime"
	"runtime/pprof"

	// "runtime"
	// "runtime/pprof"
	"strconv"
	"strings"
	"time"

	"github.com/urfave/cli"
)

const version = "1.1.2"
const versionTag = "v1.1.2"

var config *conf.Conf

var defaultDataset = "uniprot,go,eco,efo,hgnc,chebi,taxonomy,interpro,ensembl"

//var defaultDataset = "uniprot,go,eco,efo,hgnc,chebi,taxonomy,interpro,hmdb,literature_mappings,chembl,ensembl"

//var defaultDataset = "efo"

func main() {

	app := cli.NewApp()
	app.Name = "biobtree"
	app.Version = version
	app.Usage = "A tool to search and map bioinformatics identifiers and special keywords"
	app.Copyright = ""
	app.Authors = []cli.Author{
		cli.Author{
			Name:  "Tamer Gür",
			Email: "tgur@ebi.ac.uk",
		},
	}

	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "uniprot_ftp,f",
			Value: "UK",
			Usage: "uniprot ftp mirrors. Switzerland, USA or UK",
		},
		cli.StringFlag{
			Name:  "datasets,d",
			Value: defaultDataset,
			//Value: "uniprot_reviewed,taxonomy,hgnc,chebi,interpro,uniprot_unreviewed,uniparc,uniref100,uniref50,uniref90,my_data,literature_mappings,hmdb,ensembl,ensembl_bacteria,ensembl_fungi,ensembl_metazoa,ensembl_plants,ensembl_protists",
			Usage: "change default source datasets if value starts with + sign it means default dataset and given dataset. List of datasets are uniprot,taxonomy,hgnc,chebi,interpro,uniparc,uniref50,uniref90,uniref100,my_data,uniprot_unreviewed,literature_mappings,hmdb,ensembl,ensembl_bacteria,ensembl_fungi,ensembl_metazoa,ensembl_plants,ensembl_protists,go",
		},
		cli.StringFlag{
			Name:  "target_datasets,t",
			Usage: "specify target datasets. By default all datasets are included. Speeds up all process. Useful if only certain mappings are interested.",
		},
		cli.StringFlag{
			Name:  "idx,i",
			Usage: "for indexing in multiple machine. Set unique number or text for each process. No need to specify for single process",
		},
		cli.StringFlag{
			Name:  "out_dir",
			Usage: "change the output directory by default it is out folder in the same directory",
		},
		cli.StringFlag{
			Name:   "confdir",
			Hidden: true,
			Usage:  "to change default config directory while developing",
		},
		cli.BoolFlag{
			Name:  "keep",
			Usage: "Keep existing data from update command",
		},
		cli.BoolFlag{
			Name:  "include_optionals",
			Usage: "when this flag sets optional dataset which defined in the optional.dataset.json file includes for mapping. by default it is false",
		},
		cli.IntFlag{
			Name:   "maxcpu",
			Hidden: true,
			Usage:  "sets the maximum number of CPUs that can be executing simultaneously. By default biobtree uses all the CPUs when applicable.",
		},
		cli.StringFlag{
			Name:  "ensembl_genome,s",
			Value: "homo_sapiens",
			Usage: "Genome names for ensembl datasets",
		},
		cli.StringFlag{
			Name: "ensembl_genome_pattern,sp",
			//Value: "homo_sapiens",
			Usage: "Genome names pattern for ensembl datasets. e.g 'salmonella' which gets all genomes of salmonella species in ensembl",
		},
	}

	app.Commands = []cli.Command{
		{
			Name:  "start",
			Usage: "Shortcut command to execute update, generate and web",
			Action: func(c *cli.Context) error {
				return runStartCommand(c)
			},
		},
		{
			Name:  "build",
			Usage: "Shortcut command to execute update and generate. ",
			Action: func(c *cli.Context) error {
				return runBuildCommand(c)
			},
		},
		{
			Name:  "update",
			Usage: "Fetch selected datsets and produce chunk files",
			Action: func(c *cli.Context) error {
				return runUpdateCommand(c)
			},
		},
		{
			Name:  "generate",
			Usage: "Merge chunks from update command and generate LMDB database",
			Action: func(c *cli.Context) error {
				return runGenerateCommand(c)
			},
		},
		{
			Name:  "web",
			Usage: "Start web server for ws, ui and grpc",
			Action: func(c *cli.Context) error {
				return runWebCommand(c)
			},
		},
		{
			Name:   "alias",
			Usage:  "Recreates alias db this is used if new aliases wants to added while keeping existing state",
			Hidden: true,
			Action: func(c *cli.Context) error {
				return runAliasCommand(c)
			},
		},
		{
			Name:   "profile",
			Hidden: true,
			Usage:  "profile the",
			Action: func(c *cli.Context) error {
				return runProfileCommand(c)
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}

}

func runAliasCommand(c *cli.Context) error {

	log.Println("Alias running...")
	start := time.Now()
	confdir := c.GlobalString("confdir")
	outDir := c.GlobalString("out_dir")
	includeOptionals := c.GlobalBool("include_optionals")
	config = &conf.Conf{}
	config.Init(confdir, versionTag, includeOptionals, outDir)

	var ali = update.Alias{}
	ali.Merge(config)

	elapsed := time.Since(start)
	log.Printf("Alias took %s", elapsed)

	return nil
}

func runStartCommand(c *cli.Context) error {

	err := runUpdateCommand(c)
	err = runGenerateCommand(c)
	err = runWebCommand(c)
	return err

}

func runBuildCommand(c *cli.Context) error {

	err := runUpdateCommand(c)
	err = runGenerateCommand(c)
	return err

}

func runUpdateCommand(c *cli.Context) error {

	start := time.Now()

	confdir := c.GlobalString("confdir")
	outDir := c.GlobalString("out_dir")
	includeOptionals := c.GlobalBool("include_optionals")

	config = &conf.Conf{}
	config.Init(confdir, versionTag, includeOptionals, outDir)

	//var datasets []string
	//datasetsmap := map[string]bool{}

	indataset := c.GlobalString("datasets")

	if strings.HasPrefix(indataset, "+") { // add default dataset
		indataset = indataset[1:]
		indataset = indataset + "," + defaultDataset
	}

	d := strings.Split(indataset, ",")

	if len(d) == 0 {
		log.Fatal("Error:datasets must be specified")
		return nil
	}

	config.Appconf["uniprot_ftp"] = c.GlobalString("uniprot_ftp")

	t := c.GlobalString("target_datasets")
	var ts []string
	if len(t) > 0 {
		ts = strings.Split(t, ",")
	}

	s := c.GlobalString("ensembl_genome")
	var sp []string
	if len(s) > 0 {
		sp = strings.Split(s, ",")
	}

	spattern := c.GlobalString("ensembl_genome_pattern")
	var spatterns []string
	if len(spattern) > 0 {
		spatterns = strings.Split(spattern, ",")
	}

	/**
	for _, dd := range d {
		if dd == "ensembl" && len(sp) == 0 {
			log.Fatal("ERROR:When processing ensembl species must be specified")
			return nil
		}
	}
	**/

	chunkIdxx := c.GlobalString("idx")
	if len(chunkIdxx) == 0 {
		chunkIdxx = strconv.Itoa(time.Now().Nanosecond())
	}

	keep := c.GlobalBool("keep")
	if !keep {
		config.CleanOutDirs()
	}

	cpu := c.GlobalInt("maxcpu")
	if cpu > 1 {
		runtime.GOMAXPROCS(cpu)
	}

	update.NewDataUpdate(d, ts, sp, spatterns, config, chunkIdxx).Update()

	elapsed := time.Since(start)
	log.Printf("Update took %s", elapsed)

	return nil

}

func runGenerateCommand(c *cli.Context) error {

	log.Println("Generate running please wait...")

	start := time.Now()

	confdir := c.GlobalString("confdir")
	outDir := c.GlobalString("out_dir")

	config = &conf.Conf{}
	config.Init(confdir, versionTag, true, outDir)

	cpu := c.GlobalInt(" maxcpu")
	if cpu > 1 {
		runtime.GOMAXPROCS(cpu)
	}

	keep := c.GlobalBool("keep")

	var ali = update.Alias{}
	ali.Merge(config)

	var d = generate.Merge{}

	d.Merge(config, keep)

	elapsed := time.Since(start)
	log.Printf("Generate took %s", elapsed)

	return nil

}

func runWebCommand(c *cli.Context) error {

	confdir := c.GlobalString("confdir")
	outDir := c.GlobalString("out_dir")
	config = &conf.Conf{}
	config.Init(confdir, versionTag, true, outDir)

	cpu := c.GlobalInt(" maxcpu")
	if cpu > 1 {
		runtime.GOMAXPROCS(cpu)
	}

	web := service.Web{}
	web.Start(config)

	return nil

}

func runProfileCommand(c *cli.Context) error {

	confdir := c.GlobalString("confdir")
	outDir := c.GlobalString("out_dir")
	config = &conf.Conf{}
	config.Init(confdir, versionTag, true, outDir)

	os.Remove("memprof.out")
	os.Remove("cpuprof.out")

	start := time.Now()

	d := strings.Split(c.GlobalString("datasets"), ",")
	config.Appconf["uniprot_ftp"] = c.GlobalString("uniprot_ftp")

	if len(d) == 0 {
		log.Println("Error:datasets must be specified")
		return nil
	}

	f, err := os.Create("cpuprof.out")
	if err != nil {
		log.Fatal("could not create CPU profile: ", err)
	}
	if err := pprof.StartCPUProfile(f); err != nil {
		log.Fatal("could not start CPU profile: ", err)
	}
	defer pprof.StopCPUProfile()

	chunkIdxx := c.GlobalString("idx")
	if len(chunkIdxx) == 0 {
		chunkIdxx = strconv.Itoa(time.Now().Nanosecond())
	}
	//fmt.Println("chunkindex", chunkIdx)

	///updateData(d, []string{})

	elapsed := time.Since(start)
	log.Printf("finished took %s", elapsed)

	//mergeData()

	f2, err := os.Create("memprof.out")
	if err != nil {
		log.Fatal("could not create memory profile: ", err)
	}
	runtime.GC() // get up-to-date statistics
	if err := pprof.WriteHeapProfile(f2); err != nil {
		log.Fatal("could not write memory profile: ", err)
	}
	f2.Close()

	return nil

}

func check(err error) {

	if err != nil {
		fmt.Println("Error: ", err)
		panic(err)
	}

}
