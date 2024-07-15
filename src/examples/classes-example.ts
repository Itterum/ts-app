class C {
    private _length = 0;
    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
    }
}

const c = new C();

c.length = 10;

console.log(c.length);
