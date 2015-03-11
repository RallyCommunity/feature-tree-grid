Ext.define('Rally.example.FilterableTreeGrid', {
                extend: 'Rally.app.App',
                componentCls: 'app',
            
                launch: function() {
                    this.add({
                        xtype: 'rallyreleasecombobox',
                        listeners: {
                            ready: this._onReleasesLoaded,
                            select: this._onReleasesChanged,
                            scope: this
                        }
                    });
                },
            
                _onReleasesLoaded: function() {
                    Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
                        models: ['portfolioitem/feature'],
                        autoLoad: true,
                        enableHierarchy: true,
                        filters: [this._getReleaseFilter()]
                    }).then({
                        success: this._onStoreBuilt,
                        scope: this
                    });
                },
            
                _onStoreBuilt: function(store) {
                    this.add({
                        margin: '10px 0 0 0',
                        xtype: 'rallytreegrid',
                        width: 800,
                        store: store,
                        context: this.getContext(),
                        columnCfgs: [
                            'Name',
                            'State',
                            'PercentDoneByStoryCount',
                            'PercentDoneByStoryPlanEstimate',
                            'ScheduleState'
                        ]
                    });
                },
            
                _onReleasesChanged: function() {
                    var treeGrid = this.down('rallytreegrid'),
                        treeStore = treeGrid.getStore();
            
                    treeStore.clearFilter(true);
                    treeStore.filter(this._getReleaseFilter());
                },
            
                _getReleaseFilter: function() {
                    return this.down('rallyreleasecombobox').getQueryFromSelected();
                }
            });
            
