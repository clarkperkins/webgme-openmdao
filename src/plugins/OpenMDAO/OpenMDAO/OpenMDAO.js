/**
* Generated by PluginGenerator from webgme on Tue Oct 28 2014 21:14:58 GMT-0500 (CDT).
*/

define(['plugin/PluginConfig', 'plugin/PluginBase', 'plugin/OpenMDAO/OpenMDAO/meta', 'ejs', 'plugin/OpenMDAO/OpenMDAO/Templates/Templates'], function (PluginConfig, PluginBase, MetaTypes, ejs, TEMPLATES) {
    'use strict';

    /**
    * Initializes a new instance of OpenMDAO.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin OpenMDAO.
    * @constructor
    */
    var OpenMDAO = function () {
        // Call base class' constructor.
        PluginBase.call(this);
        this.metaTypes = MetaTypes;
    };

    // Prototypal inheritance from PluginBase.
    OpenMDAO.prototype = Object.create(PluginBase.prototype);
    OpenMDAO.prototype.constructor = OpenMDAO;

    /**
    * Gets the name of the OpenMDAO.
    * @returns {string} The name of the plugin.
    * @public
    */
    OpenMDAO.prototype.getName = function () {
        return "OpenMDAO";
    };

    /**
    * Gets the semantic version (semver.org) of the OpenMDAO.
    * @returns {string} The version of the plugin.
    * @public
    */
    OpenMDAO.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Gets the configuration structure for the OpenMDAO.
    * The ConfigurationStructure defines the configuration for the plugin
    * and will be used to populate the GUI when invoking the plugin from webGME.
    * @returns {object} The version of the plugin.
    * @public
    */
    //OpenMDAO.prototype.getConfigStructure = function () {
    //    return [
    //        {
    //            'name': 'species',
    //            'displayName': 'Animal Species',
    //            'regex': '^[a-zA-Z]+$',
    //            'regexMessage': 'Name can only contain English characters!',
    //            'description': 'Which species does the animal belong to.',
    //            'value': 'Horse',
    //            'valueType': 'string',
    //            'readOnly': false
    //        },
    //        {
    //            'name': 'age',
    //            'displayName': 'Age',
    //            'description': 'How old is the animal.',
    //            'value': 3,
    //            'valueType': 'number',
    //            'minValue': 0,
    //            'maxValue': 10000,
    //            'readOnly': false
    //        },
    //        {
    //            'name': 'carnivor',
    //            'displayName': 'Carnivor',
    //            'description': 'Does the animal eat other animals?',
    //            'value': false,
    //            'valueType': 'boolean',
    //            'readOnly': false
    //        },
    //        {
    //            'name': 'classification',
    //            'displayName': 'Classification',
    //            'description': '',
    //            'value': 'Vertebrates',
    //            'valueType': 'string',
    //            'valueItems': [
    //                'Vertebrates',
    //                'Invertebrates',
    //                'Unknown'
    //            ]
    //        },
    //        {
    //            'name': 'color',
    //            'displayName': 'Color',
    //            'description': 'The hex color code for the animal.',
    //            'readOnly': false,
    //            'value': '#FF0000',
    //            'regex': '^#([A-Fa-f0-9]{6})$',
    //            'valueType': 'string'
    //        },
    //        {
    //            'name': 'anAsset',
    //            'displayName': 'Document',
    //            'description': '',
    //            'value': '',
    //            'valueType': 'asset',
    //            'readOnly': false
    //        }
    //    ];
    //};


    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always has to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} callback - the result callback
    */
    OpenMDAO.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this;
        self.updateMETA(self.metaTypes);


        // Using the logger.
        //self.logger.info('This is a debug message.');
        //self.logger.info('This is an info message.');
        //self.logger.warning('This is a warning message.');
        //self.logger.error('This is an error message.');

        // Using the coreAPI to create an object.
        //var newNode = self.core.createNode({parent: self.rootNode, base: self.META['FCO']});
        //self.core.setAttribute(newNode, 'name', 'My new obj');
        //self.core.setRegistry(newNode, 'position', {x: 70, y: 70});
        //
        //// Obtain the current user configuration.
        //var currentConfig = self.getCurrentConfig();
        //self.logger.info('Current configuration ' + JSON.stringify(currentConfig, null, 4));


        if (!self.activeNode) {
            self.logger.error('No activeNode given');
            self.createMessage(self.rootNode, 'No activeNode given.');
            callback('No activeNode given', self.result);
            return;
        }

        console.log(self.activeNode);


        // First transform ejs-files into js files (needed for client-side runs) -> run Templates/combine_templates.js.
        // See instructions in file. You must run this after any modifications to the ejs template.
        var templatePY = ejs.render(TEMPLATES['assembly.py.ejs'], {a: 'a', b: 'b'});
        var templateFileName = 'generatedFiles/assembly.py';
        var artifact = self.blobClient.createArtifact('templateFiles');
        artifact.addFile(templateFileName, templatePY, function (err) {
            if (err) {
                callback(err, self.result);
                return;
            }
            self.blobClient.saveAllArtifacts(function (err, hashes) {
                if (err) {
                    callback(err, self.result);
                    return;
                }
                // This will add a download hyperlink in the result-dialog.
                self.result.addArtifact(hashes[0]);
                // This will save the changes. If you don't want to save;
                // exclude self.save and call callback directly from this scope.
                self.result.setSuccess(true);
                self.save('added obj', function (err) {
                    callback(null, self.result);
                });
            });
        });

    };

    return OpenMDAO;
});