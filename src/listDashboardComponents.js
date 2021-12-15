import React from 'react';
import './listDashboardComponents.css';

const mapEndpoint = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD9Jj7nefkF_Py11IlyQFQ3EfE9bNTK4wc&q='; // This is the same endpoint as in dashboardComponents.js: https://developers.google.com/maps/documentation/embed/get-started
let travelListFilters = [];
let wishlistItems = [];
let visitedItems = [];
let fileLink;

let formList;
let formName;
let formDesc;
let formPriority;
let formImg;

export class ListDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverLocation: 'United States'
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(e) {
        let targetClass = e.target.classList[0];

        if (e.target.classList[1]) {
            targetClass += e.target.classList[1];
        }

        if (targetClass === undefined) {
            targetClass = e.target.parentElement.parentElement.classList[0];

            if (e.target.parentElement.parentElement.classList[1]) {
                targetClass += e.target.parentElement.parentElement.classList[1];
            }
        }

        if (targetClass === 'item-icon') {
            targetClass = e.target.parentElement.classList[0];

            if (e.target.parentElement.classList[1]) {
                targetClass += e.target.parentElement.classList[1];
            }
        }

        if (this.state.hoverLocation !== targetClass && !document.getElementById('hover-controls').contains(e.target) && !document.getElementById('name-star').contains(e.target)) {
            this.setState({
                hoverLocation: targetClass
            });
        }
    }

    render() {
        return (
            <main id="list-dashboard-container">
                <div id="list-left-side">
                    <ListMap param={this.props.location} hoverLocation={this.state.hoverLocation}/>
                    <SuggestedItems/>
                </div>
                <TravelList handleMouseOver={this.handleMouseOver}/>
            </main>
        );
    }
}

class ListMap extends React.Component {
    render() {
        return (
            <div id="list-map-container">
                <iframe id="list-map" loading="lazy" allowFullScreen src={mapEndpoint + this.props.hoverLocation}></iframe>
            </div>
        );
    }
}

class SuggestedItems extends React.Component {
    render() {
        return (
            <div id="suggested-items-container">
                {!this.props.items && <h3 id="no-suggested-items">Search a destination to see suggestions<br/>(Coming Soon)</h3>}
            </div>
        );
    }
}

class TravelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 'wishlist',
            filters: travelListFilters,
            form: false,
            noItems: true
        }
        this.changeList = this.changeList.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.formOn = this.formOn.bind(this);
        this.formOff = this.formOff.bind(this);
        this.helpSubmit = this.helpSubmit.bind(this);
    }

    helpSubmit() {
        this.setState({
            noItems: false
        });
    }

    changeList(e) {
        let items = document.querySelectorAll('.control');
        let item = e.target;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('selected-list');
        }

        item.classList.add('selected-list');

        this.setState({
            list: item.id
        });
    }

    handleCheck(e) {
        const filterId = e.target.id;

        if (travelListFilters.includes(filterId)) {
            e.target.classList.remove('selected-filter');
            let index = travelListFilters.indexOf(filterId);
            travelListFilters.splice(index, 1);
        }

        else {
            e.target.classList.add('selected-filter');
            travelListFilters.push(filterId);
        }

        this.setState({
            filters: travelListFilters
        });
    }

    formOn() {
        fileLink = '';
        this.setState({
            form: true
        });
    }

    formOff() {
        this.setState({
            form: false
        });
    }

    render() {
        if (!this.state.form) {
            if (this.state.noItems) {
                return (
                    <div id="travel-list-container">
                        <TravelTopControl onClick={this.changeList} onPress={this.formOn}/>
                        <div id="list-results-container">
                            <h2 id="no-items">Click the button below to add to your Travel Bucket List<br/><button id="no-items-button" onClick={this.formOn}><i className="fas fa-plus-circle" id="no-items-plus"></i>Add Destination</button></h2>
                        </div>
                    </div>
                );
            }
            else {
                if (this.state.list === 'wishlist') {
                    return (
                        <div id="travel-list-container">
                            <TravelTopControl onClick={this.changeList} onPress={this.formOn}/>
                            <div id="list-results-container">
                                {wishlistItems.map((value, index) => {
                                    return <TravelItem key={index} handleMouseOver={this.props.handleMouseOver} attractions={value.desc} region="Unknown region" name={value.name} icon={value.img} priority={value.priority}/>
                                })}
                                <TravelBottomControl onClick={this.handleCheck}/>
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div id="travel-list-container">
                            <TravelTopControl onClick={this.changeList} onPress={this.formOn}/>
                            <div id="list-results-container">
                                {visitedItems.map((value, index) => {
                                    return <TravelItem key={index} handleMouseOver={this.props.handleMouseOver} attractions={value.desc} region="Unknown region" name={value.name} icon={value.img} priority={value.priority} display="none"/>
                                })}
                                <TravelBottomControl onClick={this.handleCheck}/>
                            </div>
                        </div>
                    );
                }
            }
        }
        else {
            return (
                <div id="travel-list-container">
                    <TravelTopControl onClick={this.changeList} onPress={this.formOn}/>
                    <div id="list-results-container">
                        <TravelForm onClick={this.formOff} onSubmit={this.helpSubmit}/>
                    </div>
                </div>
            );
        }
    }
}

/*
<TravelItem attractions="Eiffel Tower, Try a crossaint" region="Europe" icon="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900" name="Paris, France"/>
<TravelItem attractions="See the technology, Dome of the Rock" region="Middle East" icon="https://media.timeout.com/images/105434111/image.jpg" name="Tel Aviv - Yafo, Israel"/>
<TravelItem attractions="" region="Europe" name="Rome, Italy"/>
<TravelItem attractions="" region="United States" icon="https://badgerherald.com/wordpress/wp-content/uploads/2021/03/DJI_0224.jpg" name="Wisconsin, USA"/>
<TravelItem attractions="Snowboard, Skiing" region="Canada/Alaska" name="Ancorage, Alaska"/>
*/

class TravelTopControl extends React.Component {
    render() {
        return (
            <div id="top-control-container">
                <div id="travel-top-control">
                    <div id="wishlist" className="control selected-list" onClick={this.props.onClick}>Wishlist</div>
                    <div className="divider"></div>
                    <div id="visited" className="control" onClick={this.props.onClick}>Visited</div>
                </div>
                <div id="add-travel-item-container" onClick={this.props.onPress}>
                    <button id="add-travel-item"><i className="fas fa-plus-circle" id="plus"></i> Add Destination</button>
                </div>
            </div>
        );
    }
}

class TravelItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e) {
        let checkCircle = e.target;
        checkCircle.classList.toggle('wishlist-checked');

        if (checkCircle.classList.contains('far')) {
            checkCircle.classList.remove('far');
            checkCircle.classList.add('fas');
        }
        
        else {
            checkCircle.classList.remove('fas');
            checkCircle.classList.add('far');
        }
    }

    render() {
        return (
            <div id="travel-item-container" className={this.props.name} onClick={this.props.handleMouseOver}>
                <img src={this.props.icon ? this.props.icon : 'https://www.tibs.org.tw/images/default.jpg'} alt="Item Icon" className="item-icon"/>
                <div id="location-info">
                    <div id="name-star">
                        <h3 id="location-title">{this.props.name}</h3>{this.props.priority && <i id="item-star" className="fas fa-star"></i>}
                    </div>
                    <h5 id="location-region">{this.props.region}</h5>
                    <p id="attraction-ideas">{this.props.attractions ? this.props.attractions : 'No description'}</p>
                </div>
                <div id="hover-controls">
                    <div id="edit-container" className="hover-control">
                        <i className="far fa-edit hover-icons" id="edit"></i>
                    </div>
                    {!this.props.display && <div id="check-container" className="hover-control" onClick={this.handleCheck}>
                        <i className="far fa-check-circle hover-icons" id="check-circle"></i>
                    </div>}
                </div>
            </div>
        );
    } // image was taken from https://www.tibs.org.tw/en/ (I don't know why this image was on the website of the Taipei International Bakery Show either)
}

class TravelBottomControl extends React.Component {
    render() {
        return (
            <div id="bottom-control-container">
                <div id="page-control">
                    <div id="back" onClick={this.props.onBack}>&lt;</div>
                    <div id="next" onClick={this.props.onNext}>&gt;</div>
                </div>
                <div id="filters">
                    <label htmlFor="been-checkbox" id="been" className="filter" onClick={this.props.onClick}>Already Been</label>
                    <input className="hidden" type="checkbox" id="been-checkbox"/>
                    <label htmlFor="not-been-checkbox" id="not-been" className="filter" onClick={this.props.onClick}>Haven't Been Yet</label>
                    <input className="hidden" type="checkbox" id="not-been-checkbox"/>
                    <label htmlFor="priority-checkbox" id="priority" className="filter" onClick={this.props.onClick}>Priority</label>
                    <input className="hidden" type="checkbox" id="priority-checkbox"/>
                </div>
            </div>
        );
    }
}

class TravelForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();

        formList = document.getElementById('wishlist-checkbox').checked ? 'wishlist' : 'visited';
        formName = document.getElementById('form-title').value;
        formDesc = document.getElementById('form-description').value;
        formPriority = document.getElementById('priority-checkbox').checked;
        formImg = fileLink;

        let newLocation = new destination(formList, formName, formDesc, formPriority, formImg);
        newLocation.addToList();

        this.props.onClick();
        this.props.onSubmit();
    }

    previewFile() {
        let preview = document.getElementById('image-preview');
        let file = document.getElementById('file-upload').files[0];
        let reader = new FileReader();
      
        reader.onloadend = function () {
            fileLink = reader.result;
            preview.src = reader.result;
        }
      
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    handleCheck(e) {
        e.target.id !== 'form-star' ? e.target.classList.toggle('selected-filter') : e.target.parentElement.classList.toggle('selected-filter');
    }

    render() {
        return (
            <form id="travel-form-container">
                <div id="list-type-container">
                    <label htmlFor="wishlist-checkbox" id="wishlist-label" className="form-list" onClick={this.handleCheck}>Wishlist</label>
                    <input className="hidden" type="checkbox" id="wishlist-checkbox"/>
                    <label htmlFor="visited-checkbox" id="visited-label" className="form-list" onClick={this.handleCheck}>Visited</label>
                    <input className="hidden" type="checkbox" id="visited-checkbox"/>
                    <button id="exit-form" onClick={this.props.onClick}>&times;</button>
                </div>
                <div id="name-container">
                    <input type="text" id="form-title" name="title" placeholder="Destination Name"/>
                    <label htmlFor="priority-checkbox" id="priority-container" title="Priority" onClick={this.handleCheck}>
                        <i id="form-star" className="far fa-star"></i>
                    </label>
                    <input type="checkbox" id="priority-checkbox" className="hidden"/>
                </div>
                <textarea id="form-description" name="description" placeholder='Destination description i.e. "Try a crossaint"'></textarea>
                <div id="image-upload-container">
                    <img src="https://www.tibs.org.tw/images/default.jpg" alt="Preview Image" id="image-preview"/>
                    <div id="upload-container">
                        <label htmlFor="file-upload" id="file-label">Upload Image</label>
                        <input className="hidden" id="file-upload" type="file" onChange={this.previewFile} accept="image/*"/>
                        <p id="file-status">Upload an image</p>
                    </div>
                </div>
                <button id="form-submit" onClick={this.submitForm}>Add Destination</button>
            </form>
        );
    }
}

class destination {
    constructor(list, name, desc, priority, img) {
        this.list = list;
        this.name = name;
        this.desc = desc;
        this.priority = priority;
        this.img = img;
    }

    addToList() {
        if (this.list === 'wishlist') {
            wishlistItems.push({
                list: this.list,
                name: this.name,
                desc: this.desc,
                priority: this.priority,
                img: this.img
            });
        }

        else {
            visitedItems.push({
                list: this.list,
                name: this.name,
                desc: this.desc,
                priority: this.priority,
                img: this.img
            });
        }
    }
}