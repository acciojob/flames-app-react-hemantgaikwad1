import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    state = {
        name1: "",
        name2: "",
        answer: ""
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    calculateRelationship = (event) => {
        event.preventDefault();

        const { name1, name2 } = this.state;
        if (!name1.trim() || !name2.trim()) {
            this.setState({ answer: "Please Enter valid input" });
            return;
        }

        const unmatchedName2 = name2.split("");
        let unmatchedName1Length = 0;

        name1.split("").forEach((letter) => {
            const matchingIndex = unmatchedName2.indexOf(letter);
            if (matchingIndex === -1) {
                unmatchedName1Length += 1;
            } else {
                unmatchedName2.splice(matchingIndex, 1);
            }
        });

        const remainingLength = unmatchedName1Length + unmatchedName2.length;
        const relationships = [
            "Siblings",
            "Friends",
            "Love",
            "Affection",
            "Marriage",
            "Enemy"
        ];

        this.setState({ answer: relationships[remainingLength % 6] });
    };

    clearForm = () => {
        this.setState({ name1: "", name2: "", answer: "" });
    };

    render() {
        return(
            <div id="main">
                <h1>FLAMES</h1>
                <form onSubmit={this.calculateRelationship}>
                    <input
                        type="text"
                        name="name1"
                        data-testid="input1"
                        value={this.state.name1}
                        onChange={this.handleChange}
                        aria-label="First name"
                    />
                    <input
                        type="text"
                        name="name2"
                        data-testid="input2"
                        value={this.state.name2}
                        onChange={this.handleChange}
                        aria-label="Second name"
                    />
                    <button
                        type="submit"
                        name="calculate_relationship"
                        data-testid="calculate_relationship"
                    >
                        Calculate Relationship
                    </button>
                    <button
                        type="button"
                        name="clear"
                        data-testid="clear"
                        onClick={this.clearForm}
                    >
                        Clear
                    </button>
                </form>
                {this.state.answer && (
                    <h3 data-testid="answer">{this.state.answer}</h3>
                )}
            </div>
        )
    }
}


export default App;
